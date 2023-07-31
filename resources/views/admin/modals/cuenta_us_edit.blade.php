<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Empleado Municipal</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <table class="table table-bordered table-hover display compact nowrap" id="table_folios">
                <input type="hidden" name="id" id="id" value="{{ $usuario->id }}">
                <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
                <tr>
                    <th colspan="2" class="bg-primary">Datos de la cuenta</th>
                </tr>
                <tr>
                    <th>Usuario</th>
                    <td><input type="text" class="form-control" value="{{ $empleado->dni }}" disabled></td>
                </tr>
                <tr>
                    <th>Contraseña</th>
                    <td><input type="password" class="form-control" id="password" name="password" ></td>
                </tr>
                <tr>
                    <th>Nivel</th>
                    <td>
                        <select name="level" id="level" class="form-control">
                            <option value="0" {{ $usuario->level == '0' ? 'selected' : '' }} >Empleado Municipal</option>
                            <option value="1" {{ $usuario->level  == '1' ? 'selected' : '' }} >Administrador del Sistema</option>
                        </select>
                    </td>                                           
                </tr>
                <tr>
                    <th>Perfil</th>
                    <td></td>
                </tr>
            </table>
        </div>
        <div class="modal-footer">
            <button  class="btn btn-outline-success " id="btn_add_us" onclick="btnEditUs()">Agregar</button>
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>