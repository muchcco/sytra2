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

<script>

$(document).ready(function() {
    $("#tabla_resumen").DataTable();;
});


</script>

@endsection

@section('main')

<div class="pcoded-inner-content">
    <div class="main-body">
        <div class="page-wrapper">
            <div class="page-header">
                <div class="page-header-title">
                    <h4>Trámites Externos</h4>
                    <span>Agregar un nuevo expediente externo</span>
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
                                <h5>Expedientes Recientes</h5>
                                {{-- <a href="{{ route('modulos.mesapartes.td_nuevo') }}" class="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger" data-modal="modal-13"> <i class="icofont icofont-plus m-r-5"></i> Nuevo Archivo --}}
                                </a>
                            </div>
                            <div class="card-block">
                                <div class="table">
                                    <div class="table-content">
                                        <table class="table table-bordered table-hover display compact nowrap" id="tabla_resumen">
                                            <thead class="bg-dark">
                                                <tr >
                                                    <th></th>
                                                    <th>Fecha</th>
                                                    <th>Tipo</th>
                                                    <th>Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tabla_resumen_body">
                                                @forelse ($query as $i => $q)
                                                    <tr>
                                                        <td>{{ $i }}</td>
                                                        <td>
                                                            {{-- {{ $q->dd }} <br /> --}}
                                                            @if(date("d/m/Y", strtotime($q->dd)) === Carbon\Carbon::now()->format('d/m/Y'))
                                                                Fecha: <strong>Hoy</strong>, a las {{ date("g:i A", strtotime($q->fecha)) }} y {{ date("s", strtotime($q->fecha)) }}s.
                                                            @else
                                                                Fecha: {{ date("d/m/Y", strtotime($q->dd)) }} {{ date("g:i A", strtotime($q->fecha)) }} 
                                                            @endif
                                                        </td>
                                                        <td>{{ $q->nombre }}</td>
                                                        <td>{{ $q->tot }}</td>
                                                    </tr>                                                    
                                                @empty
                                                    
                                                @endforelse
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
                                            <li><a href="{{ route('modulos.mesapartes.td_nuevo') }}"><i class="icofont icofont-plus m-r-5 text-success"></i>Agregar un nuevo Folio.</a></li>
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
                                        <p>Para ver los detalles del folio de un clic sobre el asunto. <br />
                                            OJO: Si elimina un folio que ya tiene un seguimiento guardado, tambien se eliminarán todos los registros relacionados al mismo</p>
                                    </div>
                                </div>
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

@endsection