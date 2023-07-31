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

$(document).ready(function(){
    seccion_us();
});

var seccion_us = () =>{
    $( "#contenido_us" ).load(window.location.href + " #contenido_us" );
    $( "#contenido_us_edit" ).load(window.location.href + " #contenido_us_edit" );    
}

var btnModalUs = (id) => {
    
    $.ajax({
        type:'post',
        url: "{{ route('admin.modals.cuenta_us') }}",
        dataType: "json",
        data:{"_token": "{{ csrf_token() }}", id:id},
        success:function(data){
            $("#modal_add_us").html(data.html);
            $("#modal_add_us").modal('show');
        }
    });
}

var btnAddUs = () => {
    var formData = new FormData();
    formData.append("id_empleado", $("#id_empleado").val());
    formData.append("password", $("#password").val());
    formData.append("level", $("#level").val());
    formData.append("_token", $("input[name=_token]").val());

    $.ajax({
        type: "POST",
        dataType: "json",
        cache: false,
        url: "{{ route('admin.add_cuenta_us') }}",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){            
            $("#modal_add_us").modal('hide');
            seccion_us();
        },
        error: function(e){
            console.log("error");
        }
    });

}

var btnModalUsEdit = (id) => {
    
    $.ajax({
        type:'post',
        url: "{{ route('admin.modals.cuenta_us_edit') }}",
        dataType: "json",
        data:{"_token": "{{ csrf_token() }}", id:id},
        success:function(data){
            $("#modal_edit_us").html(data.html);
            $("#modal_edit_us").modal('show');
        }
    });
}

var btnEditUs = () => {
    var formData = new FormData();
    formData.append("id", $("#id").val());
    formData.append("password", $("#password").val());
    formData.append("level", $("#level").val());
    formData.append("_token", $("input[name=_token]").val());

    $.ajax({
        type: "POST",
        dataType: "json",
        cache: false,
        url: "{{ route('admin.edit_cuenta_us') }}",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){            
            $("#modal_edit_us").modal('hide');
            seccion_us();
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
                    <h4>Empleados</h4>
                    <span></span>
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
                                <h5>Lista general de empleados registrados</h5>
                                {{-- <a href="{{ route('modulos.mesapartes.td_nuevo') }}" class="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i class="icofont icofont-plus m-r-5"></i> Nuevo Archivo --}}
                                </a>
                            </div>
                            <div class="card-block">
                                <div class="table">
                                    <div class="table-content">
                                        <table class="table table-bordered table-hover display compact nowrap" id="table_folios">
                                            <tr>
                                                <th colspan="2" class="bg-primary">Datos personales</th>
                                            </tr>
                                            <tr>
                                                <th>Apellidos y Nombres</th>
                                                <td>{{ $empleado->nombreu }}</td>
                                            </tr>
                                            <tr>
                                                <th>Sexo</th>
                                                <td>
                                                    @if ($empleado->sexo == '0')
                                                        Mujer
                                                    @elseif($empleado->sexo == '1')
                                                        Hombre
                                                    @endif
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Oficina Asignada</th>
                                                <td>{{ $empleado->nom_ofi }}</td>                                           
                                            </tr>
                                            <tr>
                                                <th>Encargado</th>
                                                <td>
                                                    @if ($empleado->encargado == '0')
                                                        NO
                                                    @elseif($empleado->encargado == '1')
                                                        SI
                                                    @endif
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Cargo</th>
                                                <td>{{ $empleado->cargo }}</td>
                                            </tr>
                                        </table>                                        
                                    </div>
                                    <div class="" id="contenido_us">
                                        @if ($count == '0')
                                            <div class="alert alert-warning icons-alert">
                                                <button type="button" class="close btn btn-nocolor cursor-pointer" data-toggle="modal" data-target="#large-Modal" onclick="btnModalUs('{{ $empleado->id }}')" ><i class="icofont icofont-plus m-r-5 text-success"></i> Agregar</button>
                                                <p>Este empleado no tiene cuenta de acceso</p>
                                            </div>
                                        @elseif($count == '1')
                                            <div class="table-content">
                                                <table class="table table-bordered table-hover display compact nowrap" id="table_folios">
                                                    <tr>
                                                        <th colspan="2" class="bg-primary">Datos de la cuenta</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Usuario</th>
                                                        <td>{{ $usuario->usuario }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Contraseña</th>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Nivel</th>
                                                        <td>
                                                            @if ($usuario->level == '0')
                                                                Empleado Normal
                                                            @elseif($usuario->level == '1')
                                                                Administrador del sistema
                                                            @endif
                                                        </td>                                           
                                                    </tr>
                                                    <tr>
                                                        <th>Perfil</th>
                                                        <td></td>
                                                    </tr>
                                                </table>                                        
                                            </div>
                                        @endif
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
                                            <li><a href="{{ route('modulos.mesapartes.td_nuevo') }}"><i class="icofont icofont-edit text-default"></i> Modificar datos personales.</a></li>
                                            @if ($count == '1')
                                                <li>
                                                    <a class="cursor-pointer text-primary" id="contenido_us_edit"  data-toggle="modal" data-target="#large-Modal" onclick="btnModalUsEdit('{{ $empleado->id }}')" ><i class="icofont icofont-edit text-default"></i> Modificar datos de la cuenta.</a>
                                                </li>                                                  
                                            @endif
                                            
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
                                        <p>Para acceder a las oficinas de un clic sobre el nombre del local.</p>
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
<div class="modal fade" id="modal_add_us" tabindex="-1" role="dialog"></div>
{{-- Ver Archivo --}}
<div class="modal fade" id="modal_edit_us" tabindex="-1" role="dialog" ></div>
@endsection