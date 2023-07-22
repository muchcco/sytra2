@extends('layouts.layout')

@section('estilo')
    <!-- jpro forms css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/pages/j-pro/css/demo.css')}}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/pages/j-pro/css/font-awesome.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/pages/j-pro/css/j-forms.css')}}">

    <!-- Select 2 css -->
    <link rel="stylesheet" href="{{ asset('bower_components/select2/css/select2.min.css')}}">

    <!-- Multi Select css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap-multiselect/css/bootstrap-multiselect.css')}}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/multiselect/css/multi-select.css')}}">

    <!-- jquery file upload Frame work -->
    <link href="{{ asset('assets/pages/jquery.filer/css/jquery.filer.css')}}" type="text/css" rel="stylesheet">
    <link href="{{ asset('assets/pages/jquery.filer/css/themes/jquery.filer-dragdropbox-theme.css')}}" type="text/css" rel="stylesheet">

    <!-- animation nifty modal window effects css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/component.css')}}">
    
    
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


<script>

// VALIDAR INPUTS

function ValidarInput() {
    var e = { flag: true, mensaje: "" }


    if ($("#td_tipos_id").val() == "0" || $("#cabecera").val() == "" || $("#asunto").val() == "" ) {
        e.flag = false;
        e.mensaje = 'Debe rellenar las opciones marcadas con (*)';
        return e;
    }   

    return e;
}

// FIN VALIDADOR

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

function btnGuardar() {

    e = ValidarInput();
    console.log(e);

    if(e.flag){

        document.getElementById("Guardar").innerHTML = '<i class="fa fa-spinner fa-spin"></i> Cargando';
        document.getElementById("Guardar").disabled = true;

        var formData = new FormData();
        // Read selected files
        var files =$('input[type=file]')[0].files;
        console.log(files.length);

        for(var i=0;i<files.length;i++){
            formData.append("filer_input[]", files[i], files[i]['filer_input']);
        }
        formData.append("td_tipos_id", $("#td_tipos_id").val());
        // formData.append("pagos", $("#pagos").val());
        formData.append("cabecera", $("#cabecera").val());
        formData.append("asunto", $("#asunto").val());
        formData.append("firma", $("#firma").val());
        formData.append("nfolios", $("#nfolios").val());
        formData.append("n_doc", $("#n_doc").val());
        formData.append("d_oficina", $("#d_oficina").val());
        // formData.append("urgente", $("#urgente").val());
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
            url: "{{ route('modulos.expinterno.storenuevo') }}",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                console.log(data);
                window.location.href = "{{ route('modulos.expinterno.emitidos') }}";

            },
            error: function(e){
                console.log("error");
            }
        });
    }else{
        
         Swal.fire({
            icon: "warning",
            text: e.mensaje,
            confirmButtonText: "Aceptar"
        })
        //  $("#nom_ruta").val("");
        //alert(r.mensaje)
    }

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
                    <span>Agregar un nuevo expediente Interno</span>
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
                                {{-- <span>Datos básicos</span> --}}
                                <div class="card-header-right">
                                    <i class="icofont icofont-rounded-down"></i>
                                    <i class="icofont icofont-refresh"></i>
                                    <i class="icofont icofont-close-circled"></i>
                                </div>
                            </div>
                            <div class="card-block">
                                <form id="td_nuevo"  enctype="multipart/form-data">
                                    <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Tipo: <span class="text-danger">(*)</span> </label>
                                        <div class="col-sm-10">
                                            <select name="td_tipos_id" id="td_tipos_id" class="form-control form-control-inverse" onchange="num_doc(this.value);">
                                                <option selected value="0" disabled>-- Seleccionar un Tipo de Documento --</option>
                                                @foreach ($td_tipos as $t)
                                                    <option value="{{ $t->id }}">{{ $t->nombre }}</option>
                                                @endforeach
                                            </select>
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Cabecera: <span class="text-danger">(*)</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="cabecera" name="cabecera" value="">
                                            <input type="hidden" class="form-control" id="n_doc" name="n_doc" value="">
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Asunto: <span class="text-danger">(*)</span></label>
                                        <div class="col-sm-10">
                                            <textarea name="asunto" id="asunto" rows="5" cols="5" class="form-control" placeholder="Ingresar un asunto"></textarea>
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Firma (Nombre): <span class="text-danger">(*)</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="firma" name="firma" value="">
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">N° de Folios: <span class="text-danger">(*)</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="nfolios" name="nfolios" value="1" >
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Oficina de destino: <span class="text-danger">(*)</span></label>                                        
                                        <div class="col-sm-10">
                                            <select class="form-control form-control-inverse" multiple="multiple" name="d_oficina" id="d_oficina"> 
                                                @foreach ($oficinas as $o)
                                                    <option value="{{ $o->id }}">{{ $o->nombre }}</option>
                                                @endforeach
                                            </select>
                                            <span class="messages"></span>
                                        </div>                                    
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Prioridad:</label>
                                        <div class="col-sm-10 form-check">
                                            <input name="urgente" type="checkbox" id="urgente" value="true" checked />
                                            <label class="form-check-label" for="urgente">
                                                Marcar el expediente como ¡Urgente!
                                              </label>                                            
                                            <span class="messages"></span>
                                          
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Observaciones:</label>
                                        <div class="col-sm-10">
                                            <textarea name="obs" id="obs" rows="5" cols="5" class="form-control" placeholder="Ingresar una observación"></textarea>
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Adjuntar Archivos:</label>
                                        <div class="col-sm-10">
                                            {{-- <div class="sub-title">Example 2</div> --}}
                                            <input type="file" name="file[]" id="filer_input" multiple="multiple" class="col-sm-12">
                                            <span class="messages"></span>
                                        </div>
                                    </div>
                                    <div class="cell preloader5"></div>
                                    <div class="form-group row">
                                        <label class="col-sm-2"></label>
                                        <div class="col-sm-10">
                                            <button type="button" id="Guardar" class="btn btn-primary m-b-0 buttonload" onclick="btnGuardar()">
                                                 Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
                                        <p>Rellene los cuadros y luego pulse el boton agregar para almacenar los datos, si desea cancelar puede usar el botón respectivo de la lista de acciones. El número de expediente se asignará automáticamente, si desea cambiarlo tiene que editar el documento despues de crearlo.</p>
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