<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title"> Modificar log de expediente</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <h5>{{ $query->firma }}</h5>
            {{ $query->obs }}
            <input type="hidden" id="id" value="{{ $query->id_log }}">
            <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
            <table class="tablas">
                <tr>
                    <th>item</th>
                    <th>Valor</th>
                </tr>
                <tr>
                    <th>Forma</th>
                    <td>
                        <select name="forma" id="forma" class="form-control">
                            <option value="0" {{ '0' == $query->forma ? 'selected' : '' }} >Original</option>
                            <option value="1" {{ '1' == $query->forma ? 'selected' : '' }} >Copia</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Destino</th>
                    <td>
                        <select name="d_oficina" id="d_oficina" class="form-control">
                            @foreach ($oficina as $of)
                                <option value="{{ $of->id }}" {{ $of->id == $query->d_oficina ? 'selected' : '' }}>{{ $of->destino_nom }}</option>
                            @endforeach
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Mensaje</th>
                    <td>
                        <textarea name="obs" id="obs" cols="30" rows="10" class="form-control">{{ $query->obs_log }}</textarea>
                    </td>
                </tr>
            </table>
        </div>
        <div class="modal-footer">
            <button  class="btn btn-outline-success " onclick="btnModificarDerivar('{{ $query->id_log }}')">Modificar</button>
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>