
    <div class="sidebar_toggle"><a href="#"><i class="icon-close icons"></i></a></div>
    <div class="pcoded-inner-navbar main-menu">

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.other">Escritorio</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="@if (Request::is('/')) active @endif">
                <a href="{{ route('inicio') }}">
                    <span class="pcoded-micon"><i class="ti-layout-sidebar-left"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.sample-page.main">Inicio</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
        </ul>
        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.other">Gestion Documental</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class=" pcoded-hasmenu @if (Request::is('modulos/mesapartes*')) active pcoded-trigger @endif " >
                <a href="javascript:void(0)">
                    <span class="pcoded-micon "><i class="icon-pie-chart"></i></span>
                    <span class="pcoded-mtext">Mesa de Partes</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">
                    <li class="@if (Request::is('modulos/mesapartes/td_nuevo.php')) active @endif">
                        <a href="{{ route('modulos.mesapartes.td_nuevo') }}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.static-layout">Nuevo</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class="@if (Request::is('modulos/mesapartes/td_folios.php*')) active @endif">
                        <a href="{{ route('modulos.mesapartes.td_folios') }}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.header-fixed">Recientes</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class="@if (Request::is('modulos/mesapartes/td_resumen.php*')) active @endif">
                        <a href="{{ route('modulos.mesapartes.td_resumen') }}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.compact">Resumen</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class=" pcoded-hasmenu @if (Request::is('modulos/expinterno*')) active pcoded-trigger @endif ">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="icon-pie-chart"></i></span>
                    <span class="pcoded-mtext">Expedientes de Internos</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">
                    <li class="@if (Request::is('modulos/expinterno/td_nuevo.php')) active @endif">
                        <a href="{{ route('modulos.expinterno.td_nuevo') }}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.static-layout">Nuevo</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class="@if (Request::is('modulos/expinterno/xrecibir.php*')) active @endif">
                        <a href="{{ route('modulos.expinterno.xrecibir')}}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.header-fixed">Por recibir</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class="@if (Request::is('modulos/expinterno/recibido.php*')) active @endif">
                        <a href="{{ route('modulos.expinterno.recibido')}}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.compact">Recibidos</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class="@if (Request::is('modulos/expinterno/emitidos.php*')) active @endif">
                        <a href="{{ route('modulos.expinterno.emitidos') }}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Emitidos</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Archivados</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class="@if (Request::is('modulos/expinterno/derivado.php*')) active @endif">
                        <a href="{{ route('modulos.expinterno.derivado') }}">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Derivados</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Resumen</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="icon-pie-chart"></i></span>
                    <span class="pcoded-mtext">Expedientes de Externos</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.header-fixed">Por recibir</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.compact">Recibidos</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Archivados</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Derivados</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="icon-pie-chart"></i></span>
                    <span class="pcoded-mtext">Administrador</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.compact">Exp. internos</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Exp. Eternos</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="">
                            <span class="pcoded-micon"><i class="icon-chart"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.page_layout.vertical.sidebar-fixed">Locales</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
