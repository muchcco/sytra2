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
                <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
                <tr>
                    <th colspan="2" class="bg-primary">Datos de la cuenta</th>
                </tr>
                <tr>
                    <th>Nombres</th>
                    <td><input type="text" class="form-control" name="nombre" id="nombre" ></td>
                </tr>
                <tr>
                    <th>Apellidos</th>
                    <td><input type="text" class="form-control" name="apellido" id="apellido"></td>
                </tr>
                <tr>
                    <th>DNI</th>
                    <td><input type="text" class="form-control" name="dni" id="dni"></td>
                </tr>
                <tr>
                    <th>Fecha de Nacimiento</th>
                    <td><input type="date" class="form-control" name="f_nacimiento" id="f_nacimiento"></td>
                </tr>
                <tr>
                    <th>Correo</th>
                    <td><input type="text" class="form-control" name="mail" id="mail"></td>
                </tr>
                <tr>
                    <th>Sexo</th>
                    <td>
                        <select name="sexo" id="sexo" class="form-control">
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Titulo</th>
                    <td>
                        <select name="tit_tipo" id="tit_tipo" class="form-control">
                            <option value="0">Sr. (a)</option>
                            <option value="1">Lic.</option>
                            <option value="2">Ing.</option>
                            <option value="3">C.C.</option>
                            <option value="4">Otro</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Oficina</th>
                    <td>
                        <select name="oficinas_id" id="oficinas_id" class="form-control">
                            @forelse ($oficina as $o)
                                <option value="{{ $o->id }}">{{ $o->nombre }}</option>
                            @empty
                                <option value="">No hay datos disponibles</option>
                            @endforelse
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Encargado</th>
                    <td>
                        <select name="encargado" id="encargado" class="form-control">
                            <option value="0">No es el encargado</option>
                            <option value="1">Si es el encargado</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Cargo</th>
                    <td><input type="text" class="form-control" name="cargo" id="cargo"></td>
                </tr>
                {{-- <tr>
                    <th>Foto</th>
                    <td><input type="text" class="form-control" ></td>
                </tr> --}}
            </table>
        </div>
        <div class="modal-footer">
            <button  class="btn btn-outline-success " id="btn_add_us" onclick="btnAddEmpl()">Agregar</button>
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>