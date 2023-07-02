<div class="modal-dialog modal-lg" role="document" style="max-width: 80%;">
    <div class="modal-content" >
        <div class="modal-header">
            <h4 class="modal-title">Expediente {{ $query->exp }} - {{ $query->año_exp }} </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">

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
                                                        <th width="200">Pago</th>
                                                        <th width="10">:</th>
                                                        <td>{{$query->pago }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th width="200">Prioridad</th>
                                                        <th width="10">:</th>
                                                        <td class="<?php  if($query->urgente === 1 ){  echo "prioridad";  } ?>">
                                                            <?php  if($query->urgente === 1 ){  echo "URGENTE";  } ?>
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
                                                    <td>{{$query->c_oficina }}</td>
                                                </tr>
                                                <tr>
                                                    <th width="200">Empleado</th>
                                                    <th width="10">:</th>
                                                    <td>{{$query->empid }}</td>
                                                </tr>
                                                <tr>
                                                    <th width="200">N° Interno	</th>
                                                    <th width="10">:</th>
                                                    <td>{{$query->nombre }} {{ $query->exp }} - {{ $query->año_exp }}</td>
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
                                            @forelse ($log_derivados as $i => $log)
                                                <tr>
                                                    <td>{{ $i + 1 }}</td>
                                                    <td>{{ date("d/m/Y", strtotime($log->fecha)) }}<br /> {{ date("g:i A", strtotime($log->fecha)) }} </td>
                                                    <td>A: {{ $log->nom_lug }} | {{ $log->nom_ofi }} <br />Por: {{ $log->nombres }}</td>
                                                    <td>{{ $log->obs }}</td>
                                                    <td>
                                                        @if ($log->forma === 0)
                                                            Original
                                                        @elseif($log->forma === 1)
                                                            Copia
                                                        @endif
                                                        
                                                    </td>
                                                    <td>{{ $log->provei }}</td>
                                                    <td>
                                                        @if (isset($log->file))
                                                            {{-- <a href="{{ asset($i->ubicacion.'\\'.$i->nombre_archivo) }}" target="_blank"> --}}
                                                                <i class="fa fa-cloud-download"></i>
                                                            {{-- </a> --}}
                                                            SI
                                                        @else
                                                            NO
                                                        @endif
                                                    </td>
                                                    <td class="inline">
                                                        <button type="button" class="btn btn-sm nobtn" ><i class="fa fa-pencil-square-o"></i> Editar</button><br />
                                                        <button class="btn btn-sm nobtn" onclick="eliminarDerivados('{{ $log->id }}')"><i class="fa fa-print text-danger"></i>   Eliminar</button>
                                                    </td>
                                                </tr>
                                            @empty
                                                <tr><td colspan="8" class="text-center text-danger">NO HAY DATOS DISPONIBLES...</td></tr>
                                            @endforelse
                                        </tbody>
                                    </table>
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
                            <table class="table table-bordered table-hover">
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
                                <tbody>
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
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>