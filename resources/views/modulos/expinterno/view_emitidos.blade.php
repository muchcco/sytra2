@extends('layouts.layout')

@section('estilo')
    <!-- Data Table Css -->
<link href="{{ asset('nuevo/plugins/datatables/dataTables.bootstrap5.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{ asset('nuevo/plugins/datatables/buttons.bootstrap5.min.css')}}" rel="stylesheet" type="text/css" />
<!-- Responsive datatable examples -->
<link href="{{ asset('nuevo/plugins/datatables/responsive.bootstrap4.min.css')}}" rel="stylesheet" type="text/css" /> 
@endsection

@section('script')

<!-- data-table js -->
<script src="{{asset('nuevo/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/dataTables.bootstrap5.min.js')}}"></script>
<!-- Buttons examples -->
<script src="{{asset('nuevo/plugins/datatables/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/buttons.bootstrap5.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/jszip.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/pdfmake.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/vfs_fonts.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/buttons.html5.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/buttons.print.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/buttons.colVis.min.js')}}"></script>
<!-- Responsive examples -->
<script src="{{asset('nuevo/plugins/datatables/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('nuevo/plugins/datatables/responsive.bootstrap4.min.js')}}"></script>
<script src="{{asset('nuevo/assets/pages/jquery.datatable.init.js')}}"></script>


<!-- jquery file upload js -->
<script src="{{ asset('assets/pages/jquery.filer/js/jquery.filer.min.js')}}"></script>
<script src="{{ asset('assets/pages/filer/custom-filer.js')}}" type="text/javascript"></script>
<script src="{{ asset('assets/pages/filer/jquery.fileuploads.init.js')}}" type="text/javascript"></script>


<script>
$(document).ready(function() {
    table_derivar();
});

var tabla = $("#table_log_derivar").DataTable();
var table_derivar = () => {
    var id = "<?php echo $query['id_folio']?>";
    console.log(id);

    $.ajax({
        type: 'GET',
        url: "{{ route('modulos.expinterno.tablas.tb_emitidos_derivar_view') }}" ,
        dataType: "json",
        data: {id:id},
        success: function(data){
            document.getElementById("tabla-red").style.display = "block";
            document.getElementById("dow-table-der").style.display = "none";
            tabla.destroy();
            $("#table_log_derivar_body").html(data.html);
            tabla = $("#table_log_derivar").DataTable({
                "responsive": true,
                info: false,
                paging: false,
                ordering: false,
                searching: false,
                "autoWidth": false,
                language: {"url": "{{ asset('js/Spanish.json')}}"},
                "columns": [
                    { "width": "" },
                    { "width": "" },
                    { "width": "" },
                    { "width": "" },
                    { "width": "" },
                    { "width": "" },
                    { "width": "" },
                    { "width": "" }
                ]
            });
        },
        error: function(){
            alert("falla en la tabla");
            document.getElementById("tabla-red").style.display = "none";
            document.getElementById("dow-table-der").style.display = "block";
        }
    });
}


/******************************************************* MODAL VER DOCUMENTOS ADETALLLE **************************************************************/

var eliminarDerivados = (id) => {
    console.log(id);

    if(confirm("Desea Eliminar el Registro?")){
        $.ajax({
            url: "{{ route('modulos.expinterno.deletederivado') }}",
            type: 'post',
            dataType: 'html',
            data: {_token: $('input[name=_token]').val(), id:id},
            success: function(response){
                table_derivar();
            }
        });
        
    }else{
        return false;   
    }
}

var btnEditDerivar = (id) => {
    console.log(id);
    $.ajax({
        type:'post',
        url: "{{ route('modulos.expinterno.modals.md_edit_derivar') }}",
        dataType: "json",
        data:{"_token": "{{ csrf_token() }}", id : id},
        success:function(data){
            $("#modal_edit_derivar").html(data.html);
            $("#modal_edit_derivar").modal('show');
        }
    });
}

var btnModificarDerivar = (id) => {

    var EditData = new FormData();
    EditData.append("forma", $("#forma").val());
    EditData.append("d_oficina", $("#d_oficina").val());
    EditData.append("obs", $("#obs").val());
    EditData.append("id", $("#id").val());
    EditData.append("_token", $("input[name=_token]").val());

    $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            url: "{{ route('modulos.expinterno.edit_logderivar') }}",
            data: EditData,
            processData: false,
            contentType: false,
            success: function(data){
               console.log(data);
               table_derivar();
               $("#modal_edit_derivar").modal('hide');

            },
            error: function(e){
                console.log("error");
            }
        });

}

</script>

@endsection


@section('main')
<div class="pcoded-inner-content">

    <div class="main-body">
        <div class="page-wrapper">
            <div class="page-header">
                <div class="page-header-title">
                    <h4>Trámite Documentario</h4>
                    <span>Modificar un expediente externo</span>
                </div>
                <div class="page-header-breadcrumb">
                    <ul class="breadcrumb-title">
                        <li class="breadcrumb-item">
                            <a href="index.html">
                                <i class="icofont icofont-home"></i>
                            </a>
                        </li>
                        <li class="breadcrumb-item"><a href="#!">Pages</a>
                        </li>
                        <li class="breadcrumb-item"><a href="#!">Sample page</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page-body">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="card">
                            <div class="card-header">
                                <h5>Mesa de Partes</h5>
                                <span></span>
                                <div class="card-header-right">
                                    <i class="icofont icofont-rounded-down"></i>
                                    <i class="icofont icofont-refresh"></i>
                                    <i class="icofont icofont-close-circled"></i>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="">
                                            <div class="">                            
                                                <div class="row">
                                                    <div class="col-md-7">
                                                        <div class="panel panel-primary ">
                                                            <div class="panel-heading bg-primary">
                                                                Datos del expediente
                                                            </div>
                                                            <div class="panel-body borderpx">
                                                                <div class="">
                                                                    <br />
                                                                    <table class="table table-hover">
                                                                        <tr>
                                                                            <th width="200">Firma</th>
                                                                            <th width="10">:</th>
                                                                            <td>{{$query->firma }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th width="200">Tipo</th>
                                                                            <th width="10">:</th>
                                                                            <td>{{$query->nombre }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th width="200">Asunto</th>
                                                                            <th width="10">:</th>
                                                                            <td>{{$query->asunto }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th width="200">Cabecera</th>
                                                                            <th width="10">:</th>
                                                                            <td>{{$query->cabecera }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th width="200">N° Folios</th>
                                                                            <th width="10">:</th>
                                                                            <td>{{$query->nfolios }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th width="200">Observaciones</th>
                                                                            <th width="10">:</th>
                                                                            <td>{{$query->obs }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th width="200">Prioridad</th>
                                                                            <th width="10">:</th>
                                                                            <td class="<?php  if($query->urgente === 1 ){  echo "urgente";  } ?>">
                                                                                <?php  if($query->urgente === 1 ){  echo '<label class="text-danger"><i class="fa fa-info-circle"></i> URGENTE</label>';  } ?>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <div class="panel panel-primary">
                                                            <div class="panel-heading bg-primary">
                                                                Datos de creación
                                                            </div>
                                                            <div class="panel-body borderpx">                                        
                                                                <br />
                                                                <table class="table table-hover">
                                                                    <tr>
                                                                        <th width="200">Fecha</th>
                                                                        <th width="10">:</th>
                                                                        <td>{{$query->fecha }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th width="200">Oficina</th>
                                                                        <th width="10">:</th>
                                                                        <td>{{$query->nom_lug }} | {{$query->nom_ofi }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th width="200">Empleado</th>
                                                                        <th width="10">:</th>
                                                                        <td>{{$query->nombres }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th width="200">N° Interno	</th>
                                                                        <th width="10">:</th>
                                                                        <td>{{$query->nom_tipdoc }} {{ $query->exp }} - {{ $query->año_exp }}</td>
                                                                    </tr>
                                                                </table>
                                                                <h5>Documentos Adjuntos</h5>
                                                                <table class="table table-bordered table-hover">
                                                                    <thead class="bg-dark">
                                                                        <tr>
                                                                            <th>Nombre del Documento</th>
                                                                            <th>Ext</th>
                                                                            <th>Acciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        @forelse ($archivos as $i)
                                                                            <tr>
                                                                                <td>{{ $i->nombre_archivo }}</td>
                                                                                <td>{{ $i->ext }}</td>
                                                                                <td>
                                                                                    <a href="{{ asset($i->ubicacion.'\\'.$i->nombre_archivo) }}" target="_blank"><i class="fa fa-cloud-download"></i></a>
                                                                                </td>
                                                                            </tr>
                                                                        @empty
                                                                            <tr>
                                                                                <td colspan="3" class="text-center text-danger">NO HAY DATOS DISPONIBLES...</td>
                                                                            </tr> 
                                                                       @endforelse 
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="panel panel-primary ">
                                                    <div class="panel-heading bg-primary">
                                                        Seguimiento del Expediente - Derivados
                                                    </div>
                                                    <div class="panel-body borderpx">
                                                        <div id="tabla-red">
                                                            <table class="table table-bordered table-hover" id="table_log_derivar">
                                                                <thead class="bg-dark">
                                                                    <tr>
                                                                        <td>#</td>
                                                                        <td>Fecha</td>
                                                                        <td>Oficina</td>
                                                                        <td>Observaciones</td>
                                                                        <td>Forma</td>
                                                                        <td>Proveido</td>
                                                                        <td>Adjunto</td>
                                                                        <td>Acciones</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="table_log_derivar_body">
                                                                   
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div id="dow-table-der">
                                                            <div class="preloader3 loader-block">
                                                                <div class="circ1 loader-default"></div>
                                                                <div class="circ2 loader-default"></div>
                                                                <div class="circ3 loader-default"></div>
                                                                <div class="circ4 loader-default"></div>
                                                            </div>
                                                        </div>                                                     
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary ">
                                            <div class="panel-heading bg-primary">
                                                Seguimiento del Expediente - Archivados
                                            </div>
                                            <div class="panel-body borderpx">
                                                <table class="table table-bordered table-hover" id="table_log_archivar">
                                                    <thead class="bg-dark">
                                                        <tr>
                                                            <td>#</td>
                                                            <td>Fecha</td>
                                                            <td>Oficina</td>
                                                            <td>Observaciones</td>
                                                            <td>Forma</td>
                                                            <td>Proveido</td>
                                                            <td>Adjunto</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="table_log_archivar_body">
                                                        @forelse ($log_archivados as $i => $log_arc)
                                                            <tr>
                                                                <td>{{ $i + 1 }}</td>
                                                                <td>{{ date("d/m/Y H:i:s", strtotime($log_arc->fecha)) }}</td>
                                                                <td>{{ $log_arc->nombre }}</td>
                                                                <td>{{ $log_arc->obs }}</td>
                                                                <td>{{ $log_arc->forma }}</td>
                                                                <td>{{ $log_arc->provei }}</td>
                                                                <td></td>
                                                            </tr>
                                                        @empty
                                                            <tr><td colspan="7" class="text-center text-danger">NO HAY DATOS DISPONIBLES...</td></tr>
                                                        @endforelse
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-header">
                                <h5>Opciones</h5>
                            </div>
                            <div class="card-block">

                                <div class="panel panel-primary">
                                    <div class="panel-heading bg-primary">
                                        Información
                                    </div>
                                    <div class="panel-body">                                        
                                        <br />
                                        <ul>
                                            <li><a href=""><i class="icofont icofont-refresh text-success" ></i> Refrescar página</a></li>
                                            <li><a href="{{ route('modulos.expinterno.edit_emitidos', $query->id_folio) }}"><i class="icofont icofont-edit text-default" ></i> Modificar folio</a></li>
                                            <li><a href=""><i class="icofont icofont-close-circled text-danger"></i> Eliminar folio.</a></li>
                                            <li><a href=""><i class="icofont icofont-print text-primary" ></i> Cargo</a></li>
                                            <li><a href=""><i class="icofont icofont-print text-primary" ></i> Imprimir</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="styleSelector">

    </div>
</div>

{{-- Edit Log Derivar --}}
<div class="modal fade" id="modal_edit_derivar" tabindex="-1" role="dialog" ></div>

@endsection