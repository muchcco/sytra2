@extends('layouts.layout')

@section('estilo')
<!-- Data Table Css -->
<link href="{{ asset('nuevo/plugins/datatables/dataTables.bootstrap5.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{ asset('nuevo/plugins/datatables/buttons.bootstrap5.min.css')}}" rel="stylesheet" type="text/css" />
<!-- Responsive datatable examples -->
<link href="{{ asset('nuevo/plugins/datatables/responsive.bootstrap4.min.css')}}" rel="stylesheet" type="text/css" /> 
 
<style>
    
</style>

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

<script>

$(document).ready(function() {
    table_emitidos();
});

var tabla = $("#table_emitidos").DataTable();
var table_emitidos = () => {
    $.ajax({
        type: 'GET',
        url: "{{ route('modulos.expexterno.tablas.tb_xrecibir') }}" ,
        dataType: "json",
        success: function(data){
            tabla.destroy();
            $("#table_emitidos_body").html(data.html);
            tabla = $("#table_emitidos").DataTable({
                "responsive": true,
                "autoWidth": false,
                language: {"url": "{{ asset('js/Spanish.json')}}"}, 
                "columns": [
                    { "width": "" },
                    { "width": "15px" },
                    { "width": "" },
                    { "width": "" },
                    { "width": "10px" },
                    { "width": "10px" },
                    { "width": "" }
                ]
            });
        },
        error: function(){
            console.log("error");
            // location.reload();
        }
    });
}

var btnModalArchivos = (id, tipo_log) => {
    console.log(id);

    $.ajax({
        type:'post',
        url: "{{ route('modulos.expinterno.modals.md_em_archivo') }}",
        dataType: "json",
        data:{"_token": "{{ csrf_token() }}", id : id, tipo_log: tipo_log},
        success:function(data){
            $("#modal_ver_archivo").html(data.html);
            $("#modal_ver_archivo").modal('show');
        }
    });
}

var btnModalArchivosDerivado = (id, tipo_log) => {
    console.log(id);

    $.ajax({
        type:'post',
        url: "{{ route('modulos.expinterno.modals.md_em_archivo') }}",
        dataType: "json",
        data:{"_token": "{{ csrf_token() }}", id : id, tipo_log: tipo_log},
        success:function(data){
            $("#modal_ver_archivo").html(data.html);
            $("#modal_ver_archivo").modal('show');
        }
    });
}

var btnRecibir = (id, folio) => {
    console.log(id);

    swal.fire({
        title: "Seguro que desea recibir el expediente?",
        text: `Recibir`,
        type: "warning",
        icon: 'info',
        showCancelButton: !0,
        confirmButtonText: "Si, Recibir!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.value) {
                $.ajax({
                    url: "{{ route('modulos.expinterno.recibir_exp') }}",
                    type: 'post',
                    data: {_token: $('input[name=_token]').val(), id: id, folio: folio},
                    success: function(response){
                        table_emitidos();
                    }
                });
        }

    })
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
                    <span>Expedientes Internos</span>
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
                        <!-- Product list card start -->
                        <div class="card product-add-modal">
                            <div class="card-header">
                                <h5>Lista de expedientes sin recibir</h5>
                                {{-- <a href="{{ route('modulos.mesapartes.td_nuevo') }}" class="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i class="icofont icofont-plus m-r-5"></i> Nuevo Archivo --}}
                                </a>
                            </div>
                            <div class="card-block">
                                <div class="table">
                                    <div class="table-content">
                                        <table class="table table-bordered table-hover display compact nowrap" id="table_emitidos">
                                            <thead class="bg-dark">
                                                <tr >
                                                    <th></th>
                                                    <th>Número Interno</th>
                                                    <th>Cabecera y Fecha</th>
                                                    <th>Firma, asunto y <br />observaciones</th>
                                                    <th>Adjunto <br />Folio</th>
                                                    <th>Adjunto <br />Derivado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table_emitidos_body">
                                                
                                            </tbody>
                                        </table>
                                        
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
                            <div class="card-block ">

                                <div class="panel panel-primary ">
                                    <div class="panel-heading bg-primary">
                                        Información
                                    </div>
                                    <div class="panel-body">                                        
                                        <br />
                                        <ul>
                                            <li><a href=""><i class="icofont icofont-refresh text-success" ></i> Refrescar</a></li>
                                            {{-- <li><a href="{{ route('modulos.mesapartes.td_nuevo') }}"><i class="icofont icofont-plus m-r-5 text-success"></i>Agregar un nuevo Folio.</a></li> --}}
                                        </ul>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div class="panel panel-primary">
                                    <div class="panel-heading bg-primary">
                                        Información
                                    </div>
                                    <div class="panel-body">
                                        <p>Desde aquí puede aceptar un documento como "Recibido" y tambien puede revisarlo para ver su recorrido y archivos adjuntos al mismo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>

        </div>
    </div>
</div>

{{-- Ver Expediente --}}
<div class="modal fade" id="modal_ver_expediente" tabindex="-1" role="dialog"></div>
{{-- Ver Archivo --}}
<div class="modal fade" id="modal_ver_archivo" tabindex="-1" role="dialog" ></div>
@endsection