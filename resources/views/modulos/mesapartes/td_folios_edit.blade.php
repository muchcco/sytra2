@extends('layouts.layout')

@section('estilo')
    
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

var selca2 = (sdep2) => {
    var ttec=" <?php echo date("d/m/Y");?>";
    var edest=document.getElementById("cabecera");
    var myselect=document.getElementById("td_tipos_id");
    var imsel=0;
    for (var i=0; i<myselect.options.length; i++){
        if (myselect.options[i].value==sdep2){
            imsel=i;
            break
        }
    }
    var tdec=myselect.options[imsel].text;
    if(tdec=="Otro...") tdec="(Especifique)";
    edest.value=tdec+" "+ttec;
}


var btnEdit = () => {

    var formData = new FormData();
        

        
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            url: "{{ route('modulos.mesapartes.storenuevo') }}",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
               console.log(data);
               window.location.href = "{{ route('modulos.mesapartes.td_folios') }}";

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
                                            <select name="td_tipos_id" id="td_tipos_id" class="form-control form-control-inverse" onchange="selca2(this.value);">
                                                @foreach ($td_tipos as $t)
                                                    <option value="{{ $t->id }}" {{ $t->id == $folios->td_tipos_id ? 'selected' : '' }} >{{ $t->nombre }}</option>
                                                @endforeach
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 15%">Expediente N°</th>
                                        <td>
                                            <input type="text" class="form-control" value="{{ $folios->exp }} - {{ $folios->año_exp }}" disabled>
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
                                </table>
                                
                                <br />
                                <form id="FormDocAdj" name="FormDocAdj" enctype="multipart/form-data">
                                    <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
                                    <div class="row">
                                        <div class="col-sm-5">
                                            <label class="control-label">Adjuntar archivos</label><br/>
                                            <div class="input_container">
                                                <input type="file" id="fileUpload">
                                            </div>                                                                                            
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="form-group">
                                                <label class="control-label">.</label><br/>
                                                    <button class="btn btn-dark  has-dark" id="guardar_doc" type="button" data-bind="click: CargarArchivos"><i class="fa fa-upload" aria-hidden="true"></i>  Cargar</button>
                                            </div>
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