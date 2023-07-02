<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Documentos Adjuntos al Expediente {{ $query->exp }} - {{ $query->año_exp }} </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <h5>Documentos Adjuntos</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre del Documento</th>
                        <th>Tipo de Documento</th>
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
                            <td colspan="3">NO HAY DATOS DISPONIBLES...</td>
                        </tr> 
                    @endforelse                    
                </tbody>

            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>