<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;

use App\Http\Controllers\MesaPartes\PrincipalController;
use App\Http\Controllers\MesaPartes\TablesController;
use App\Http\Controllers\MesaPartes\AccionesController;

Auth::routes();

Route::group(['middleware' => ['auth']], function () {
    Route::get('/' , [PagesController::class, 'index'])->name('inicio');

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::group(['prefix'=>'modulos/','as'=>'modulos.' ],function () {

        Route::group(['prefix'=>'mesapartes','as'=>'mesapartes.' ],function () {


            /************************************************* MESA DE PARTES  ******************************************************* */

            Route::get('/td_nuevo.php', [PrincipalController::class, 'td_nuevo'])->name('td_nuevo');
            Route::get('/td_folios.php', [PrincipalController::class, 'td_folios'])->name('td_folios');

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
    });
});