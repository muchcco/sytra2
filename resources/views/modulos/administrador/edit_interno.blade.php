@extends('layouts.layout')

@section('estilo')
    
    <style>
        .input_container {
        border: 1px solid #e5e5e5;
        }

        input[type=file]::file-selector-button {
        background-color: #fff;
        color: #000;
        border: 0px;
        border-right: 1px solid #e5e5e5;
        padding: 10px 15px;
        margin-right: 20px;
        transition: .5s;
        }

        input[type=file]::file-selector-button:hover {
        background-color: #fff;
        border: 0px;
        border-right: 1px solid #e5e5e5;        
        }

       
    </style>

@endsection

@section('script')
    
<script type="text/javascript" src="{{ asset('assets/pages/j-pro/js/custom/currency-form.js')}}"></script>

<!-- j-pro js -->
<script type="text/javascript" src="{{ asset('assets/pages/j-pro/js/jquery.ui.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/pages/j-pro/js/jquery.maskedinput.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/pages/j-pro/js/jquery-cloneya.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/pages/j-pro/js/autoNumeric.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/pages/j-pro/js/jquery.stepper.min.js')}}"></script>

<!-- Select 2 js -->
<script type="text/javascript" src="{{ asset('bower_components/select2/js/select2.full.min.js')}}"></script>

<!-- Multiselect js -->
<script type="text/javascript" src="{{ asset('bower_components/bootstrap-multiselect/js/bootstrap-multiselect.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/multiselect/js/jquery.multi-select.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/js/jquery.quicksearch.js')}}"></script>

<!-- jquery file upload js -->
<script src="{{ asset('assets/pages/jquery.filer/js/jquery.filer.min.js')}}"></script>
<script src="{{ asset('assets/pages/filer/custom-filer.js')}}" type="text/javascript"></script>
<script src="{{ asset('assets/pages/filer/jquery.fileuploads.init.js')}}" type="text/javascript"></script>

<!-- sweet alert js -->
<script type="text/javascript" src="{{ asset('bower_components/sweetalert/js/sweetalert.min.js')}}"></script>
{{-- <script type="text/javascript" src="{{ asset('assets/js/modal.js')}}"></script> --}}
<!-- sweet alert modal.js intialize js -->
<!-- modalEffects js nifty modal window effects -->
<script type="text/javascript" src="{{ asset('assets/js/modalEffects.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/js/classie.js')}}"></script>

<script src="{{ asset('js/knockout-3.5.1.js') }}"></script>

<!-- data-table js -->
<script src="{{asset('nuevo/plugins/datatables/jquery.dataTables.min.js')}}"></script>

<script>

$(document).ready(function() {
    carga();
});

function num_doc(ndoc){
    console.log(ndoc);
    var ttec=" <?php echo date("Y");?>";
    var siglas = "<?php echo $c_oficina['siglas']?>"
    var edest=document.getElementById("cabecera");
    var n_doc = document.getElementById("n_doc");
    var myselect=document.getElementById("td_tipos_id");
    var imsel=0;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "{{ route('modulos.expinterno.buscar_ndoc') }}",
        data:{"_token": "{{ csrf_token() }}", ndoc : ndoc},
        success: function(response){
            console.log(response);                
            for (var i=0; i<myselect.options.length; i++){
                if (myselect.options[i].value==ndoc){
                    imsel=i;
                    break
                }
            }
            var tdec=myselect.options[imsel].text;
            if(tdec=="Otro...") tdec="(Especifique)";
            edest.value=tdec+" N° "+response+"-"+ttec+"/"+siglas+"/"+"MDA";
            n_doc.value = response;
        },
        error: function(jqxhr,textStatus,errorThrown){
            console.log(jqxhr);
            console.log(textStatus);
            console.log(errorThrown);
            //location.reload();
        }
    });
}

var btnEdit = (id) => {

    var formData = new FormData();      
    formData.append("id", id);
    formData.append("td_tipos_id", $("#td_tipos_id").val());
    formData.append("cabecera", $("#cabecera").val());
    formData.append("asunto", $("#asunto").val());
    formData.append("firma", $("#firma").val());
    formData.append("nfolios", $("#nfolios").val());
    if(document.querySelector("#urgente").checked == true){
        formData.append('urgente', 1)
    }else{
        formData.append('urgente', 0)
    }
    formData.append("obs", $("#obs").val());
    formData.append("_token", $("input[name=_token]").val());
        
    $.ajax({
        type: "POST",
        dataType: "json",
        cache: false,
        url: "{{ route('modulos.expinterno.update_emitidos') }}",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log(data);
            window.location.href = "{{ route('modulos.administrador.edit_interno') }}";

        },
        error: function(e){
            console.log("error");
        }
        });


}

var btnAddFile = (id) => {

    // var id = "<?php echo $folios['id']?>";

    var file_data = $("#nom_ruta").prop("files")[0];
    var formData = new FormData();
    formData.append("nom_ruta", file_data);
    formData.append("id", id);
    formData.append("tipo_log", "folioint");
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

}

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
    $.post("{{ route('modulos.expinterno.tablas.tb_edit_file') }}",
            {
                _token: "{{ csrf_token() }}",
                id: id
            },
            function (data) {
                vForm.archivos(data);
                // $("#table_archivos").DataTable({
                //     "responsive": true,
                //     info: false,
                //     paging: false,
                //     ordering: false,
                //     searching: false,
                //     "autoWidth": false,
                //     language: {"url": "{{ asset('js/Spanish.json')}}"},
                //     "columns": [
                //         { "width": "" },
                //         { "width": "" },
                //         { "width": "" }
                //     ]
                // });
            }
    );
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
                               
                                <table class="tablas">
                                    <tr>
                                        <th style="width: 15%">Item</th>
                                        <th>Valor</th>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Tipo</th>
                                        <td>
                                            <select name="td_tipos_id" id="td_tipos_id" class="form-control form-control-inverse" onchange="num_doc(this.value);">
                                                @foreach ($td_tipos as $t)
                                                    <option value="{{ $t->id }}" {{ $t->id == $folios->td_tipos_id ? 'selected' : '' }} >{{ $t->nombre }}</option>
                                                @endforeach
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Expediente N°</th>
                                        <td>
                                            <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
                                            <input type="text" class="form-control" value="{{ $folios->exp }} - {{ $folios->año_exp }}" disabled>
                                            <input type="hidden" class="form-control" id="n_doc" name="n_doc" value="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Cabecera</th>
                                        <td>
                                            <input type="text" class="form-control" id="cabecera" name="cabecera" value="{{ $folios->cabecera }}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Asunto</th>
                                        <td>
                                            <textarea name="asunto" id="asunto" rows="5" cols="5" class="form-control" placeholder="Ingresar un asunto">{{ $folios->asunto }}</textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Firma</th>
                                        <td>
                                            <input type="text" class="form-control" id="firma" name="firma" value="{{ $folios->firma }}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">N° de folios</th>
                                        <td>
                                            <input type="text" class="form-control" id="nfolios" name="nfolios" value="{{ $folios->nfolios }}" >
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">prioridad</th>
                                        <td>
                                            <input name="urgente" type="checkbox" id="urgente" value="{{ $folios->urgente }}" {{ $folios->urgente == 1 ? 'checked' : null }} />
                                            <label class="form-check-label" for="urgente">
                                                Marcar el expediente como ¡Urgente!
                                              </label>    
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Observaciones</th>
                                        <td>
                                            <textarea name="obs" id="obs" rows="5" cols="5" class="form-control" placeholder="Ingresar una observación">{{ $folios->obs }}</textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Documentos Adjuntos</th>
                                        <td style="background:#fff;">
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
                                                        <button type="button" class="btn btn-sm btn-primary" onclick="btnAddFile('{{ $folios->id }}')"><i class="fa fa-upload"></i> Cargar</button>
                                                    </div>
                                                </div>                                            
                                            </form>
                                            <br />
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
                                                @if($cant_archivos === 0)
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="3"class="text-center text-danger">NO HAY DATOS DISPONIBLES...</td>
                                                    </tr>
                                                </tfoot>
                                                @endif
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="text-left set-btn">
                                            <button type="button" class="btn btn-primary waves-effect waves-light  m-t-10 m-r-10" onclick="btnEdit('{{ $folios->id }}')">Modificar
                                            </button>
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
                                            <li><a href=""><i class="icofont icofont-refresh text-success" ></i> Refrescar</a></li>
                                            <li><a href="{{ route('modulos.mesapartes.td_folios') }}"><i class="icofont icofont-close-circled text-danger"></i> Cancelar e ir a la lista general.</a></li>
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
                                        <p>Rellene los cuadros y luego pulse el boton modificar para almacenar los datos, si desea cancelar puede usar el botón respectivo de la lista de acciones.</p>
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