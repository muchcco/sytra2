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
            <input type="hidden" id="folio_id" value="{{ $query->id }}">
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
                @if($proveido === "2")
                    <tr>
                        <th>Proveido</th>
                        <td>
                            <input type="text" name="proveido" id="proveido"  class="form-control">
                        </td>
                    </tr>
                @endif
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
                @if($proveido === "2")
                    <tr>
                        <th>Archivos</th>
                        <td>
                            <br />
                            <form class="formulario" action="" style="padding-left: 0em;  "  enctype="multipart/form-data">
                                <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        {{-- <label for="">Archivos</label> --}}
                                        <div class="input_container">
                                            <input type="file" name="nom_ruta" id="nom_ruta">
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                    </div>
                                    <div class="col-sm-2">
                                        {{-- <label for="">Archivos</label> --}}                                                        
                                        <button type="button" class="btn btn-sm btn-primary" onclick="btnFile('{{ $folios->id }}')"><i class="fa fa-upload"></i> Cargar</button>
                                    </div>
                                </div>                                            
                            </form>
                            <br />
                            <div id="file">
                                    <table class="table table-hover table-bordered" id="table_archivos">
                                        <thead>
                                            <tr class="bg-dark">
                                                <th>Nombre del Documento</th>
                                                <th>Archivo</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>                                                
                                        <tbody data-bind="foreach: archivos">
                                            <tr>
                                                <td><span data-bind="text: nombre_archivo"></span></td>
                                                <td style="text-align: center;"><a data-bind="click: $root.ver_archivo" target="blank" style="cursor:pointer; text-align: center;"><i  class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>    
                                                <td style="text-align: center;">
                                                    <a data-bind="click: $root.eliminar_archivo" target="blank" style="color:red; cursor:pointer;"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>                                
                                    </table>
                            </div>                      
                        </td>
                    </tr>
                @endif
            </table>
        </div>
        <div class="modal-footer">
            <button  class="btn btn-outline-success " onclick="btnModificarDerivar('{{ $query->id_log }}')">Derivar</button>
            <button type="button" class="btn btn-outline-danger " data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>
<script src="{{ asset('js/knockout-3.5.1.js') }}"></script>
<script>
$(document).ready(function() {
    carga();
});

function vistaForm() {
var self = this;

self.ver_archivo = function (item) {
    Ver_Archivo(item);
}

self.eliminar_archivo = function(item){
    Eliminar_Archivo(item);
}

self.archivos = ko.observableArray();
}

var vForm = new vistaForm();
ko.applyBindings(vForm);

var carga = () => {
    var id = "<?php echo $folios['id']?>";
    $.post("{{ route('modulos.expinterno.tablas.tb_derivar') }}",
            {
                _token: "{{ csrf_token() }}",
                id: id
            },
            function (data) {
                vForm.archivos(data);
            }
    );
}

/* =========================================  VALIDAR INPUTS PDF Y EXCEL ADJUNTADOS EN CADA PROCESO =============================================== */

function Validar_Archivos_PDF () {
    var r = { flag: true, mensaje: "" }

    // SELECCIONAR COMBO TIPO DE DOCUMENTO Y FILE PDF
    if ($("#nom_doc").val() == "0" || $("#nom_doc").val() == "" ) {
        r.flag = false;
        r.mensaje = "Debe seleccionar el tipo de documento";
        return r;
    }

    // if ($("#nom_ruta").val() == ""){
    //     r.flag = false;
    //     r.mensaje = "Debe seleccionar un Archivo PDF";
    //     return r;
    // }

        //valida archivo
        if ($("#nom_ruta").val() != "") {
            var iSize = 0;
            iSize = (Math.round($("#nom_ruta")[0].files[0].size / 1024) / 1024);
            console.log(iSize);

            if (iSize > 209.715) {
                r.flag = false;
                r.mensaje = "El archivo es superior a  200 MB, actualmente pesa " + iSize + " MB";
                return r;
            }

            var archivo_ = $("#nom_ruta").val();
            var extension_ = archivo_.split('.').pop().toUpperCase();

            if (iSize > 0 && extension_ != "PDF") {
                r.flag = false;
                r.mensaje = "Archivo no válido: " + extension_;
                return r;
            }
        }
        else {
            r.mensaje = "Debe seleccionar el archivo";
            r.flag = false;
            return r;
        }

    return r;
}
/* =========================================  FIN VALIDAR INPUTS PDF Y EXCEL ADJUNTADOS EN CADA PROCESO =============================================== */

var btnFile = (id) => {
    console.log(id);
    // var id = "<?php echo $folios['id']?>";

    r = Validar_Archivos_PDF();

    if(r.flag){
        var file_data = $("#nom_ruta").prop("files")[0];
        var formData = new FormData();
        formData.append("nom_ruta", file_data);
        formData.append("id", id);
        formData.append("tipo_log", "derivar");
        formData.append("_token", $("input[name=_token]").val());

        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            url: "{{ route('modulos.expinterno.storearchivos') }}",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                console.log(data);
                $("#nom_ruta").val("");
                carga();
            },
            error: function(e){
                console.log("error");
            }
        });
    }else{
        // Swal.fire({
        //                 icon: "warning",
        //                 text: r.mensaje,
        //                 confirmButtonText: "Aceptar"
        //             })
        //     $("#nom_ruta").val("");
        alert(r.mensaje)
    }
}

var Ver_Archivo =  (item) =>{
    console.log(item);

    var link = '{{ URL::to('/') }}';

    var ruta = '/archivos/folioint/'+item.año_exp+'/'+item.exp+'/'+item.nombre_archivo;

    var href =  link+ruta;

    var blank = "_blank";
    window.open(href, blank);

    console.log(link+ruta);
}

var Eliminar_Archivo =  (item) =>{
    console.log(item);

    var id = item.id_archivo;

    $.ajax({
        type: "POST",
        dataType: "json",        
        url: "{{ route('modulos.expinterno.eliminar_archivos') }}",
        data: { "_token": "{{ csrf_token() }}", id : id },
        success: function(data){
            console.log(data);
            carga();
        },
        error: function(e){
            console.log("error");
        }
    });

}


</script>