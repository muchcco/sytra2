<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExternoController;
use App\Http\Controllers\PagesController;

use App\Http\Controllers\MesaPartes\PrincipalController;
use App\Http\Controllers\MesaPartes\TablesController;
use App\Http\Controllers\MesaPartes\AccionesController;

use App\Http\Controllers\ExpInterno\ExpPrincipalController;
use App\Http\Controllers\ExpInterno\ExpAccionesController;
use App\Http\Controllers\ExpInterno\ExpTablesController;

Auth::routes();

Route::get('mesa_partes.php' , [ExternoController::class, 'mesa_partes'])->name('mesa_partes');
Route::post('store' , [ExternoController::class, 'store'])->name('store');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/' , [PagesController::class, 'index'])->name('inicio');

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::group(['prefix'=>'modulos/','as'=>'modulos.' ],function () {

        /************************************************* MESA DE PARTES  ******************************************************* */

        Route::group(['prefix'=>'mesapartes','as'=>'mesapartes.' ],function () {           

            Route::get('/td_nuevo.php', [PrincipalController::class, 'td_nuevo'])->name('td_nuevo');
            Route::get('/td_folios.php', [PrincipalController::class, 'td_folios'])->name('td_folios');
            Route::get('/td_resumen.php', [PrincipalController::class, 'td_resumen'])->name('td_resumen');

            // TABLAS
            Route::get('/tablas/tb_td_folios.php', [TablesController::class, 'tb_td_folios'])->name('tablas.tb_td_folios');
            Route::get('/tablas/tb_td_folios_view.php', [TablesController::class, 'tb_td_folios_view'])->name('tablas.tb_td_folios_view');   
            
            Route::post('/tablas/tabladocexpediente', [TablesController::class, 'tabladocexpediente'])->name('tablas.tabladocexpediente');   

            // MODALES
            Route::post('/modals/md_archivos_td_folios', [PrincipalController::class, 'md_archivos_td_folios'])->name('modals.md_archivos_td_folios');
            Route::post('/modals/md_ver_td_folios', [PrincipalController::class, 'md_ver_td_folios'])->name('modals.md_ver_td_folios');
            Route::post('/modals/md_edit_derivar', [PrincipalController::class, 'md_edit_derivar'])->name('modals.md_edit_derivar');

            // EDITAR VIEW
            Route::get('/td_folios.php/td_folios_view/{id}', [PrincipalController::class, 'td_folios_view'])->name('td_folios_view');
            Route::get('/td_folios.php/td_folios_edit/{id}', [PrincipalController::class, 'td_folios_edit'])->name('td_folios_edit');

            // METODOS GUARDAR ACTUALIZAR ELIMINAR
            Route::post('/storenuevo', [AccionesController::class, 'storenuevo'])->name('storenuevo');
            Route::post('/editexp', [AccionesController::class, 'editexp'])->name('editexp');
            Route::post('/deletederivado', [AccionesController::class, 'deletederivado'])->name('deletederivado');

            Route::post('/edit_logderivar', [AccionesController::class, 'edit_logderivar'])->name('edit_logderivar');

            Route::post('/storearchivos', [AccionesController::class, 'storearchivos'])->name('storearchivos');
            Route::post('/eliminar_archivos', [AccionesController::class, 'eliminar_archivos'])->name('eliminar_archivos');
        });

        /************************************************* EXPEDIENTES INTERNOS  ******************************************************* */

        Route::group(['prefix'=>'expinterno','as'=>'expinterno.' ],function () {

            /*=================== REGISTROS ================== */

            Route::get('/td_nuevo.php', [ExpPrincipalController::class, 'td_nuevo'])->name('td_nuevo');
            Route::post('/buscar_ndoc.php', [ExpPrincipalController::class, 'buscar_ndoc'])->name('buscar_ndoc');

            Route::get('/xrecibir.php', [ExpPrincipalController::class, 'xrecibir'])->name('xrecibir');
            Route::get('/recibido.php', [ExpPrincipalController::class, 'recibido'])->name('recibido');
            Route::get('/archivado.php', [ExpPrincipalController::class, 'archivado'])->name('archivado');
            Route::get('/derivado.php', [ExpPrincipalController::class, 'derivado'])->name('derivado');
            Route::get('/resumen.php', [ExpPrincipalController::class, 'resumen'])->name('resumen');
            

            // EMITIDOS
            Route::get('/emitidos.php', [ExpPrincipalController::class, 'emitidos'])->name('emitidos');
            Route::get('/emitidos.php/edit_emitidos.php/{id}', [ExpPrincipalController::class, 'edit_emitidos'])->name('edit_emitidos');
            Route::get('/emitidos.php/view_emitidos.php/{id}', [ExpPrincipalController::class, 'view_emitidos'])->name('view_emitidos');

            /*=================== TABLAS ================== */

            //XRECIBIR
            Route::get('/tablas/tb_xrecibir.php', [ExpTablesController::class, 'tb_xrecibir'])->name('tablas.tb_xrecibir');            

            //RECIBIDO
            Route::get('/tablas/tb_recibido.php', [ExpTablesController::class, 'tb_recibido'])->name('tablas.tb_recibido');
            Route::post('/tablas/tb_derivar.php', [ExpTablesController::class, 'tb_derivar'])->name('tablas.tb_derivar');  /// VER ARCHIVOS CARGADOS EN EL MODAL
            Route::post('/tablas/tb_archivar.php', [ExpTablesController::class, 'tb_archivar'])->name('tablas.tb_archivar'); /// VER ARCHIVOS CARGADOS EN EL MODAL

            //DERIVADO
            Route::get('/tablas/tb_derivado.php', [ExpTablesController::class, 'tb_derivado'])->name('tablas.tb_derivado');

            //ARCHIVADO
            Route::get('/tablas/tb_archivado.php', [ExpTablesController::class, 'tb_archivado'])->name('tablas.tb_archivado');

            //EMITIDOS
            Route::get('/tablas/tb_emitidos.php', [ExpTablesController::class, 'tb_emitidos'])->name('tablas.tb_emitidos');
            Route::get('/tablas/tb_emitidos_view.php', [ExpTablesController::class, 'tb_emitidos_view'])->name('tablas.tb_emitidos_view');            
            Route::get('/tablas/tb_emitidos_derivar_view.php', [ExpTablesController::class, 'tb_emitidos_derivar_view'])->name('tablas.tb_emitidos_derivar_view');
            Route::get('/tablas/tb_emitidos_archivar_view.php', [ExpTablesController::class, 'tb_emitidos_archivar_view'])->name('tablas.tb_emitidos_archivar_view');
            Route::post('/tablas/tb_edit_file', [ExpTablesController::class, 'tb_edit_file'])->name('tablas.tb_edit_file');   

            /*=================== MODALES ================== */
            // EMITIDOS
            Route::post('/modals/md_em_archivo', [ExpPrincipalController::class, 'md_em_archivo'])->name('modals.md_em_archivo');
            Route::post('/modals/md_edit_derivar', [ExpPrincipalController::class, 'md_edit_derivar'])->name('modals.md_edit_derivar');

            //RECIBIDO
            Route::post('/modals/md_rec_derivar', [ExpPrincipalController::class, 'md_rec_derivar'])->name('modals.md_rec_derivar');
            Route::post('/modals/md_rec_archivar', [ExpPrincipalController::class, 'md_rec_archivar'])->name('modals.md_rec_archivar');

            /*=================== METODOS GUARDAR ACTUALIZAR ELIMINAR ================== */
            
            Route::post('/storenuevo', [ExpAccionesController::class, 'storenuevo'])->name('storenuevo');

            // EMITIDOS
            Route::post('/update_emitidos', [ExpAccionesController::class, 'update_emitidos'])->name('update_emitidos');
            Route::post('/storearchivos', [ExpAccionesController::class, 'storearchivos'])->name('storearchivos');
            Route::post('/eliminar_archivos', [ExpAccionesController::class, 'eliminar_archivos'])->name('eliminar_archivos');
            Route::post('/deletederivado', [ExpAccionesController::class, 'deletederivado'])->name('deletederivado');
            Route::post('/edit_logderivar', [ExpAccionesController::class, 'edit_logderivar'])->name('edit_logderivar');

            //XRECIBIR
            Route::post('/recibir_exp', [ExpAccionesController::class, 'recibir_exp'])->name('recibir_exp');

            //RECIBIR
            Route::post('/rec_derivar', [ExpAccionesController::class, 'rec_derivar'])->name('rec_derivar');
            Route::post('/rec_archivar', [ExpAccionesController::class, 'rec_archivar'])->name('rec_archivar');

            

        });
    });
});