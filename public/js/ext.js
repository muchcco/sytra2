function JSHome(uri) {
    this.uri = uri;

    this.ddlIdTipoPersona = $('#IdTipoPersona');
    this.txtRuc = $('#ruc');
    this.txtRaz = $('#raz');
    this.txtDni = $('#dni');
    this.txtPat = $('#pat');
    this.txtMat = $('#mat');
    this.txtNom = $('#nom');
    this.txtTel = $('#tel');
    this.txtCorreo = $('#correo');
    this.txtDir = $('#dir');
    this.ddlIdTipoDocumento = $('#IdTipoDocumento');
    this.txtNroDoc = $('#nrodoc');
    this.txtFolios = $('#folios');
    this.txtAsu = $('#asu');
    this.txtAsuConta = $('#contadoasunto');

    this.fileDoc = $('#fileDoc');
    this.fileAnexo = $('#fileAnexo');

    this.spanMensajeDocumento = $('#mensajeDocumento');
    this.spanMensajeAnexo = $('#mensajeAnexo');

    this.divRuc = $('#divRuc');

    this.btnUpload = $('#btnUpload');
    this.btnUploadAnexo = $('#btnUploadAnexo');
    this.btnEnviar = $('#btnEnviar');

    this.gridDocumento = $('#tablaDocumento');
    this.gridAnexo = $('#tablaAnexo');

    this.SlcDepartamento = $('#slcDepartamento');
    this.SlcProvincia = $('#slcProvincia');
    this.SlcDistrito = $('#slcDistrito');
    this.inputCaptcha = $('#inputCaptcha');

    this.ddlIdTipoDocumentoIdentidad = $('#IdTipoDocumentoIdentidad');
}

JSHome.prototype.init = function () {
    this.handler();
}

JSHome.prototype.handler = function () {

    RefrescarImagenCaptcha();

    $("#lnkRefrescarCaptcha").click(function () {
        RefrescarImagenCaptcha();
    });

    var obj = this;
    obj.SlcProvincia.empty();
    obj.SlcProvincia.append(new Option("[SELECCIONE]", ""));
    obj.SlcDistrito.empty();
    obj.SlcDistrito.append(new Option("[SELECCIONE]", ""));

    obj.SlcProvincia.on('change', function () {        
        var fileData = new FormData();
        fileData.append('tipo', "DIS");
        fileData.append('filtro', obj.SlcDepartamento.val()+this.value);
        $.ajax({
            url: obj.uri + 'Home/BuscarUbigeo',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            beforeSend: function () {
            },
            success: function (result) {                
                obj.SlcDistrito.empty();
                obj.SlcDistrito.append(new Option("[SELECCIONE]", ""));
                if (result != null && result.length > 0) {
                    $.each(result, function (index, value) {
                        obj.SlcDistrito.append(new Option(value.Nombre, value.Codigo));
                    });
                }
            },
            error: function (err) {
                MostrarMensaje(titulo, err.statusText, "error");
            }
        });

    });

    obj.SlcDepartamento.on('change', function () {
        
        var fileData = new FormData();
        fileData.append('tipo', "PRO");
        fileData.append('filtro', this.value);
        $.ajax({
            url: obj.uri + 'Home/BuscarUbigeo',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            beforeSend: function () {                
            },
            success: function (result) {
                obj.SlcProvincia.empty();
                obj.SlcProvincia.append(new Option("[SELECCIONE]", ""));
                obj.SlcDistrito.empty();
                obj.SlcDistrito.append(new Option("[SELECCIONE]", ""));
                if (result != null && result.length > 0) {                   
                    $.each(result, function (index, value) {
                        obj.SlcProvincia.append(new Option(value.Nombre, value.Codigo));
                    });
                }                                  
            },
            error: function (err) {
                MostrarMensaje(titulo, err.statusText, "error");                 
            }
        });

    });

    obj.ddlIdTipoPersona.on('change', function () {
       // $('#dni').val('');
        $('#ruc').val('');
        $('#raz').val('');
        if (this.value == '03') {
            obj.divRuc.hide();
        } else if (this.value == '02') {
            obj.divRuc.show();
        }
    });

    obj.ddlIdTipoPersona.trigger('change');

    obj.btnUpload.on('click', function (e) {
        e.preventDefault();
        var button = $(this);
        var tipo = "";
        var titulo = "Cargar Archivo";
        var labelText = "Escoge un archivo";
        var siezekiloByte = 0;
        var fileUpload = obj.fileDoc.get(0);
        var files = fileUpload.files;
        
        var fileData = new FormData();
        if (files != null && files.length>0) { 
            var pos = files[0].name.lastIndexOf(".");
            var post = files[0].name.length - pos;
            var ext = files[0].name.substr(-(post)).toUpperCase();
            
            if (ext == ".PDF") {
                for (var i = 0; i < files.length; i++) {
                    fileData.append(files[i].name, files[i]);
                    var sizeByte = files[i].size;
                    siezekiloByte = parseInt(sizeByte);
                }
            }
            else {
                tipo = "error";
                MostrarMensaje(titulo, "El formato del archivo debe ser pdf", tipo);
                return;
            }
        }
        if (siezekiloByte == 0) {
            tipo = "error";
            MostrarMensaje(titulo, "No hay archivo seleccionado", tipo);
            return false;
        }
        if (siezekiloByte > 50000000) {
            tipo = "error";
            MostrarMensaje(titulo, "El archivo supera el tamaño maximo permitido de 50MB", tipo);
            return false;
        }
        fileData.append('indicador', 'documento');

       

        $.ajax({
            url: obj.uri + 'Home/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            //data: null,
            beforeSend: function () {
                button.prop('disabled', true);
            },
            success: function (result) {
                console.log(result, "errorrr");
                if (result.Success) {
                    tipo = "success";
                    obj.spanMensajeDocumento.hide();
                    obj.cargarTablaDocumento(result);
                } else {
                    tipo = "error";
                    MostrarMensaje(titulo, result.Message, tipo);
                }
                
                button.prop('disabled', false);
            },
            error: function (err) {
                console.log(err, "errorrr");
                MostrarMensaje(titulo, "Contáctese con su administrador de red local", "warning");
                button.prop('disabled', false);
            }
        });

        obj.fileDoc.val('');
        obj.fileDoc.prev('label').text(labelText);

    });

    obj.gridDocumento.on('click', 'tbody tr button.data_delete', function (e) {
        e.preventDefault();
        var button = $(this);
        var _key = button.data("key");

        var tipo = "";
        var titulo = "Cargar Archivo";

        var fileData = new FormData();
        fileData.append('indicador', 'documento');
        fileData.append('key', _key);

        var labelText = "Escoge un archivo";

        $.ajax({
            url: obj.uri + 'Home/DeleteUploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            beforeSend: function () {
                button.prop('disabled', true);
            },
            success: function (result) {
                if (result.Success) {
                    tipo = "success";
                    obj.deleteTablaDocumento(result);
                } else {
                    tipo = "error";
                }

                MostrarMensaje(titulo, result.Message, tipo);
                button.prop('disabled', false);
            },
            error: function (err) {
                MostrarMensaje(titulo, err.statusText, "error");
                button.prop('disabled', false);
            }
        });

        obj.fileDoc.val('');
        obj.fileDoc.prev('label').text(labelText);

    });

    obj.btnUploadAnexo.on('click', function (e) {
        e.preventDefault();
        var button = $(this);
        var tipo = "";
        var titulo = "Cargar Anexo";
        var labelText = "Escoge un archivo";
        var fileUpload = obj.fileAnexo.get(0);
        var files = fileUpload.files;
        var siezekiloByte = 0;
        var fileData = new FormData();
        if (files != null && files.length > 0) {
            var pos = files[0].name.lastIndexOf(".");
            var post = files[0].name.length - pos;
            var ext = files[0].name.substr(-(post)).toUpperCase();
            if (ext == ".PDF" || ext == ".JPG" || ext == ".JPEG" || ext == ".DOCX" || ext == ".DOC" || ext == ".XLS" || ext == ".XLSX") {
                for (var i = 0; i < files.length; i++) {
                    fileData.append(files[i].name, files[i]);
                    var sizeByte = files[i].size;
                    siezekiloByte = parseInt(sizeByte);
                }
            }
            else {
                tipo = "error";
                MostrarMensaje(titulo, "El formato del archivo debe ser jpg, jpeg, doc, docx, xls, xlsx o pdf", tipo);
                return;
            }

            
        }
        if (siezekiloByte == 0) {
            tipo = "error";
            MostrarMensaje(titulo, "No hay archivo seleccionado", tipo);
            return false;
        }
        if (siezekiloByte > 20000000) {
            tipo = "error";
            MostrarMensaje(titulo, "El archivo supera el tamaño maximo permitido de 20MB", tipo);
            return false;
        }
        fileData.append('indicador', 'anexo');

       

        $.ajax({
            url: obj.uri + 'Home/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            beforeSend: function () {
                button.prop('disabled', true);
            },
            success: function (result) {
                if (result.Success) {
                    tipo = "success";
                    obj.spanMensajeAnexo.hide();
                    obj.cargarTablaAnexo(result);
                } else {
                    tipo = "error";
                    MostrarMensaje(titulo, result.Message, tipo);
                }
                
                button.prop('disabled', false);
            },
            error: function (err) {
                MostrarMensaje(titulo, "Contáctese con su administrador de red local", "warning");
                button.prop('disabled', false);
            }
        });

        obj.fileAnexo.val('');
        obj.fileAnexo.prev('label').text(labelText);
    });

    obj.gridAnexo.on('click', 'tbody tr button.data_delete_anexo', function (e) {
        e.preventDefault();
        var button = $(this);
        var _key = button.data("key");

        var tipo = "";
        var titulo = "Cargar Anexo";

        var fileData = new FormData();
        fileData.append('indicador', 'anexo');
        fileData.append('key', _key);

        var labelText = "Escoge un archivo";

        $.ajax({
            url: obj.uri + 'Home/DeleteUploadFilesAnexo',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            beforeSend: function () {
                button.prop('disabled', true);
            },
            success: function (result) {
                if (result.Success) {
                    tipo = "success";
                    obj.deleteTablaAnexo(result);
                } else {
                    tipo = "error";
                }

                MostrarMensaje(titulo, result.Message, tipo);
                button.prop('disabled', false);
            },
            error: function (err) {
                MostrarMensaje(titulo, err.statusText, "error");
                button.prop('disabled', false);
            }
        });

        obj.fileDoc.val('');
        obj.fileDoc.prev('label').text(labelText);

    });

    obj.btnEnviar.on('click', function (e) {
        e.preventDefault();
        if (obj.txtDni.val() == null  || obj.txtDni.val() == '' ) {
            obj.txtDni.addClass("hasError");
        } else {
            obj.txtDni.removeClass("hasError");
        }
        if (obj.txtRaz.val() == null || obj.txtRaz.val() == '') {
            obj.txtRaz.addClass("hasError");
        } else {
            obj.txtRaz.removeClass("hasError");
        }
        if (obj.txtRuc.val() == null || obj.txtRuc.val() == '') {
            obj.txtRuc.addClass("hasError");
        } else {
            obj.txtRuc.removeClass("hasError");
        }
        if (obj.ddlIdTipoDocumentoIdentidad.val() == "01") {
            if (obj.txtMat.val() == null || obj.txtMat.val() == '') {
                obj.txtMat.addClass("hasError");
            } else {
                obj.txtMat.removeClass("hasError");
            }
        }
        else {
            obj.txtMat.removeClass("hasError");
        }
        if (obj.txtPat.val() == null || obj.txtPat.val() == '') {
            obj.txtPat.addClass("hasError");
        } else {
            obj.txtPat.removeClass("hasError");
        }
        if (obj.txtNom.val() == null || obj.txtNom.val() == '') {
            obj.txtNom.addClass("hasError");
        } else {
            obj.txtNom.removeClass("hasError");
        }
        if (obj.txtTel.val() == null || obj.txtTel.val() == '') {
            obj.txtTel.addClass("hasError");
        } else {
            obj.txtTel.removeClass("hasError");
        }
        if (obj.txtCorreo.val() == null || obj.txtCorreo.val() == '') {
            obj.txtCorreo.addClass("hasError");
        } else {
            obj.txtCorreo.removeClass("hasError");
        }
        if (obj.txtDir.val() == null || obj.txtDir.val() == '') {
            obj.txtDir.addClass("hasError");
        } else {
            obj.txtDir.removeClass("hasError");
        }
        if (obj.ddlIdTipoDocumento.val() == null || obj.ddlIdTipoDocumento.val() == '') {
            obj.ddlIdTipoDocumento.addClass("hasError");
        } else {
            obj.ddlIdTipoDocumento.removeClass("hasError");
        }
        if (obj.txtNroDoc.val() == null || obj.txtNroDoc.val() == '') {
            obj.txtNroDoc.addClass("hasError");
        } else {
            obj.txtNroDoc.removeClass("hasError");
        }
        if (obj.txtFolios.val() == null || obj.txtFolios.val() == '') {
            obj.txtFolios.addClass("hasError");
        } else {
            obj.txtFolios.removeClass("hasError");
        }
        if (obj.txtAsu.val() == null || obj.txtAsu.val() == '') {
            obj.txtAsu.addClass("hasError");
        } else {
            obj.txtAsu.removeClass("hasError");
        }

        //if (obj.SlcDepartamento.val() == null || obj.SlcDepartamento.val() == '') {
        //    obj.SlcDepartamento.addClass("hasError");
        //} else {
        //    obj.SlcDepartamento.removeClass("hasError");
        //}

        //if (obj.SlcProvincia.val() == null || obj.SlcProvincia.val() == '') {
        //    obj.SlcProvincia.addClass("hasError");
        //} else {
        //    obj.SlcProvincia.removeClass("hasError");
        //}         
        //if (obj.SlcDistrito.val() == null || obj.SlcDistrito.val() == '') {
        //    obj.SlcDistrito.addClass("hasError");
        //} else {
        //    obj.SlcDistrito.removeClass("hasError");
        //}
         


        var button = $(this);

        var fileData = new FormData();
        fileData.append('IdTipoPersona', obj.ddlIdTipoPersona.val());
        fileData.append('DNI', obj.txtDni.val());
        fileData.append('RazonSocial', obj.txtRaz.val());
        fileData.append('Ruc', obj.txtRuc.val());
        fileData.append('ApellidoPaterno', obj.txtPat.val());
        fileData.append('ApellidoMaterno', obj.txtMat.val());
        fileData.append('Nombres', obj.txtNom.val());
        fileData.append('Telefono', obj.txtTel.val());
        fileData.append('Correo', obj.txtCorreo.val());
        fileData.append('Direccion', obj.txtDir.val());
        fileData.append('IdTipoDocumento', obj.ddlIdTipoDocumento.val());
        fileData.append('NroDocumento', obj.txtNroDoc.val());
        fileData.append('NroFolios', obj.txtFolios.val());
        fileData.append('Asunto', obj.txtAsu.val());
        fileData.append('strCapcha', obj.inputCaptcha.val());
        fileData.append('IdTipoDocumentoIdentidad', obj.ddlIdTipoDocumentoIdentidad.val());

        
        //fileData.append('IdDepartamento', obj.SlcDepartamento.val());
        //fileData.append('IdProvincia', obj.SlcProvincia.val());
        //fileData.append('IdDistrito', obj.SlcDistrito.val());

       /* if (!validateEmail(obj.txtCorreo.val())) {
            MostrarMensajeModal("Error de validación", "El correo es inválido", "error");
            return false;
        }
        */
        var tipo = "";
        var titulo = "Enviar documento";

        $.ajax({
            url: obj.uri + 'Home/Index',
            type: "POST",
            contentType: false, 
            processData: false, 
            data: fileData,
            beforeSend: function () {
                button.prop('disabled', true);
                button.html('ESPERE');
            },
            success: function (result) {
                if (result.Success) {
                    tipo = "success";
                    //cargar el modeal de confirmacion
                    var _href = obj.uri + 'Home/Confirmacion?Indicador=' + result.Confirmacion.Indicador + '&Exp=' + result.Confirmacion.Exp + '&Ano=' + result.Confirmacion.Ano + '&Nuemi=' + result.Confirmacion.Nuemi + '&Correo=' + result.Confirmacion.Correo;
                    $('.modal-content').load(_href, function () {
                        $('#modalForm').modal('show');
                    });
                    obj.LimpiarFormulario();
                } else {
                    tipo = "error";
                    console.log(result);
                    validateDNIservice(result);
                    MostrarMensajeModal(titulo, result.Message, tipo);
                    RefrescarImagenCaptcha();
                }
                
                button.prop('disabled', false);
                button.html('ENVIAR');
            },
            error: function (err) {
                MostrarMensaje(titulo, err.statusText, "error");
                button.prop('disabled', false);
                button.html('ENVIAR');
            }
        });

    });
    
    //obj.txtDni.on('keyup', function (e) {
    //    var val = $(this).val().trim();
    //    val = val.replace(/\s+/g, '');

    //    var fileData = new FormData();
    //    fileData.append('dni', val);

    //    if (val.length >= 8) {
    //        $.ajax({
    //            url: obj.uri + 'Home/GetData',
    //            type: "POST",
    //            contentType: false, // Not to set any content header  
    //            processData: false, // Not to process data  
    //            data: fileData,
    //            success: function (result) {
    //                if (result.Success) {
    //                    obj.txtNom.val(result.Nombres);
    //                    obj.txtPat.val(result.ApePaterno);
    //                    obj.txtMat.val(result.ApeMaterno);
    //                    obj.txtDir.val(result.Direccion);
    //                }
    //            },
    //            error: function (err) {
    //            }
    //        });
    //    }
    //});

    obj.txtRuc.on('keyup', function (e) {
        var val = $(this).val().trim();
        val = val.replace(/\s+/g, '');

        var fileData = new FormData();
        fileData.append('ruc', val);

        if (val.length >= 11) {
            $.ajax({
                url: obj.uri + 'Home/GetDataRuckeyup',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,
                success: function (result) {
                    if (result.Success) {
                        obj.txtRaz.val(result.RazonSocial);
                    }
                },
                error: function (err) {
                }
            });
        }
    });

    obj.ddlIdTipoDocumentoIdentidad.on('change', function () {
        obj.txtDni.val("");
        obj.txtPat.val("");
        obj.txtMat.val("");
        obj.txtNom.val("");
        if (obj.ddlIdTipoDocumentoIdentidad.val() == "01") {
            $("#sMaterno").text("(*)");
            obj.txtDni.attr("maxlength", "8");
        }
        else if (obj.ddlIdTipoDocumentoIdentidad.val() == "02") {
            $("#sMaterno").text("");
            obj.txtDni.attr("maxlength", "10");
        }
        else {
            $("#sMaterno").text("");
            obj.txtDni.attr("maxlength", "10");
        }

    });

    obj.txtAsu.on('keyup',   function (e) {         
        var este = $(this),
            maxlength = este.attr('maxlength'),
            maxlengthint = parseInt(maxlength),
            textoActual = este.val(),
            currentCharacters = este.val().length;
            remainingCharacters = maxlengthint - currentCharacters;
        // Detectamos si es IE9 y si hemos llegado al final, convertir el -1 en 0 - bug ie9 porq. no coge directamente el atributo 'maxlength' de HTML5
        if (document.addEventListener && !window.requestAnimationFrame) {
            if (remainingCharacters <= -1) {
                remainingCharacters = 0;
            }
        }
        
        obj.txtAsuConta.html(remainingCharacters); 
        /*if (!!maxlength) {
            var texto = este.val();
            if (texto.length >= maxlength) {
                este.removeClass().addClass("borderojo");
                este.val(text.substring(0, maxlength));
                e.preventDefault();
            }
            else if (texto.length < maxlength) {
                este.removeClass().addClass("bordegris");
            }
        }*/
    });

    var _href = obj.uri + 'Home/TerminosCondiciones';
    $('#modalFormLg .modal-content').load(_href, function () {
        $('#modalFormLg').modal('show');
    });

    $('#asu').on('blur', function (e) {
        if (!/^[ a-z0-9áéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ,.]+/ig, "");
        }
        if (obj.txtAsu.val() == null || obj.txtAsu.val() == '') {
            obj.txtAsu.addClass("hasError");
        } else {
            obj.txtAsu.removeClass("hasError");
        }
    });
    $('#raz').on('blur', function (e) {
        if (!/^[ a-z0-9áéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ,.]+/ig, "");
        }
        
        if (obj.txtRaz.val() == null || obj.txtRaz.val() == '') {
            obj.txtRaz.addClass("hasError");
        } else {
            obj.txtRaz.removeClass("hasError");
        }
        

    });
    $('#pat').on('blur', function (e) {

        if (!/^[ a-záéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-záéíóúüñ,.]+/ig, "");
        }
        if (obj.txtPat.val() == null || obj.txtPat.val() == '') {
            obj.txtPat.addClass("hasError");
        } else {
            obj.txtPat.removeClass("hasError");
        }
    });
    $('#mat').on('blur', function (e) {

        if (obj.ddlIdTipoDocumentoIdentidad.val() == "01") {
            if (!/^[ a-záéíóúüñ,.]*$/i.test(this.value)) {
                this.value = this.value.replace(/[^ a-záéíóúüñ,.]+/ig, "");
            }
            if (obj.txtMat.val() == null || obj.txtMat.val() == '') {
                obj.txtMat.addClass("hasError");
            } else {
                obj.txtMat.removeClass("hasError");
            }
        }
       
    });
    $('#nom').on('blur', function (e) {
        if (!/^[ a-záéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-záéíóúüñ,.]+/ig, "");
        }
        if (obj.txtNom.val() == null || obj.txtNom.val() == '') {
            obj.txtNom.addClass("hasError");
        } else {
            obj.txtNom.removeClass("hasError");
        }
    });
    $('#tel').on('blur', function (e) {
        if (!/^[ 0-9]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ 0-9]+/ig, "");
        }
        if (obj.txtTel.val() == null || obj.txtTel.val() == '') {
            obj.txtTel.addClass("hasError");
        } else {
            obj.txtTel.removeClass("hasError");
        }

    });
    $('#correo').on('blur', function (e) {
        if (!/^[ a-z0-9áéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ,.@]+/ig, "");
        }
        if (obj.txtCorreo.val() == null || obj.txtCorreo.val() == '') {
            obj.txtCorreo.addClass("hasError");
        } else {
            obj.txtCorreo.removeClass("hasError");
        }



    });
    $('#dir').on('blur', function (e) {
        if (!/^[ a-z0-9áéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ,.]+/ig, "");
        }
        if (obj.txtDir.val() == null || obj.txtDir.val() == '') {
            obj.txtDir.addClass("hasError");
        } else {
            obj.txtDir.removeClass("hasError");
        }

    });
    $('#folios').on('blur', function (e) {
        if (!/^[ 0-9]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ 0-9]+/ig, "");
        }
        if (obj.txtFolios.val() == null || obj.txtFolios.val() == '') {
            obj.txtFolios.addClass("hasError");
        } else {
            obj.txtFolios.removeClass("hasError");
        }
    });
    $('#nrodoc').on('blur', function (e) {
        if (!/^[ a-z0-9áéíóúüñ,.]*$/i.test(this.value)) {
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ,.]+/ig, "");
        }       
        if (obj.txtNroDoc.val() == null || obj.txtNroDoc.val() == '') {
            obj.txtNroDoc.addClass("hasError");
        } else {
            obj.txtNroDoc.removeClass("hasError");
        }

    });

    $('#dni').on('blur', function (e) {
        var val = $(this).val().trim();
       if (obj.txtDni.val() == null || obj.txtDni.val() == '') {
           obj.txtDni.addClass("hasError");
       } else {
           obj.txtDni.removeClass("hasError");
           if (val.length < 8) {
               obj.txtDni.addClass("hasError");
           }

       }
        
    });


    //$('#dni').blur(function () {
    //    alert("dddd")
    //    if (obj.txtDni.val() == null || obj.txtDni.val() == '') {
    //        obj.txtDni.addClass("hasError");
    //    } else {
    //        obj.txtDni.removeClass("hasError");
    //    }
    //});

    $('#ruc').on('blur', function (e) {
        var val = $(this).val().trim();
        if (obj.txtRuc.val() == null || obj.txtRuc.val() == '') {
            obj.txtRuc.addClass("hasError");
        } else {
            obj.txtRuc.removeClass("hasError");
            if (val.length < 11) {
                obj.txtRuc.addClass("hasError");
            }

        }
          
    });
    $('#IdTipoDocumento').on('input', function (e) {        
        if (obj.ddlIdTipoDocumento.val() == null || obj.ddlIdTipoDocumento.val() == '') {
            obj.ddlIdTipoDocumento.addClass("hasError");
        } else {
            obj.ddlIdTipoDocumento.removeClass("hasError");
        }


    });
}

JSHome.prototype.cargarTablaDocumento = function (result) {
    var obj = this;
    obj.gridDocumento.append("<tr><td>" + result.NombreArchivo + "</td><td>" + result.TipoArchivo + "</td><td>" + result.PesoArchivo.toFixed(2) + "[MB]</td><td class='text-center'><button id='1' type='button' class='btn btn-default btn-xs data_delete' data-key='" + result.Key + "'><span class='glyphicon glyphicon-trash'></span></button></td></tr>");
    obj.gridDocumento.show();    
}

JSHome.prototype.deleteTablaDocumento = function (result) {
    var obj = this;
    obj.spanMensajeDocumento.show();
    obj.gridDocumento.find('tbody').detach();
    obj.gridDocumento.append($('<tbody>'));
    obj.gridDocumento.hide();
    obj.btnUpload.prop('disabled', false); 
}

JSHome.prototype.cargarTablaAnexo = function (result) {
    var obj = this;
    obj.gridAnexo.append("<tr id='" + result.Key + "'><td>" + result.NombreArchivo + "</td><td>" + result.TipoArchivo + "</td><td>" + result.PesoArchivo.toFixed(2) + "[MB]</td><td class='text-center'><button type='button' class='btn btn-default btn-xs data_delete_anexo' data-key='" + result.Key + "'><span class='glyphicon glyphicon-trash'></span></button></td></tr>");
    obj.gridAnexo.show();
}

JSHome.prototype.deleteTablaAnexo = function (result) {
    var obj = this;
    $('tr#' + result.Key).remove();
}

JSHome.prototype.LimpiarFormulario = function () {
    var obj = this;
    $(":text").each(function () {
        $($(this)).val('');
    });
    obj.txtCorreo.val('');
    obj.txtAsu.val('');
    obj.fileDoc.val(null);
    obj.fileAnexo.val(null);
    obj.ddlIdTipoDocumento.prop('selectedIndex', 0);
    obj.ddlIdTipoPersona.prop('selectedIndex', 0);
    obj.ddlIdTipoPersona.trigger('change');

    obj.spanMensajeDocumento.show();
    obj.gridDocumento.find('tbody').detach();
    obj.gridDocumento.append($('<tbody>'));
    obj.gridDocumento.hide();

    obj.spanMensajeAnexo.show();
    obj.gridAnexo.find('tbody').detach();
    obj.gridAnexo.append($('<tbody>'));
    obj.gridAnexo.hide();
    obj.SlcDepartamento.val('');
    obj.SlcProvincia.val('');
    obj.SlcDistrito.val('');
    obj.inputCaptcha.val('');
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function RefrescarImagenCaptcha() {

    $.ajax({
        type: "POST",
        url: myPath,
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $('#imgCaptcha').attr("src", "data:image/png;base64," + result);
        },
        error: function (err) {
            // alert(err.status + " - " + err.statusText);
        }
    });
}


function validateDNIservice(objResult) {

    if (objResult.bPaterno) {
        $('#pat').addClass("hasError");
    }
    if (objResult.bMaterno) {
        $('#mat').addClass("hasError");
    }
    if (objResult.bNombres) {
        $('#nom').addClass("hasError");
    }

}
