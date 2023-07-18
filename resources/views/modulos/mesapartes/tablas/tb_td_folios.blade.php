@foreach ($query as $q)
    <tr class="<?php if($q->urgente === 1 ){  echo "urgente";  } ?>">
        <td><i class="<?php if($q->urgente === 1 ){  echo "icofont icofont-star text-danger ";  } ?>"></i></td>
        <td>{{ $q->nombre }} <br /> {{ $q->exp }} - {{ $q->año_exp }}</td>
        <td>
            {{ $q->cabecera }} <br /> 
            @if(date("d/m/Y", strtotime($q->fecha)) === Carbon\Carbon::now()->format('d/m/Y'))
                Fecha: <strong>Hoy</strong>, a las {{ date("g:i A", strtotime($q->fecha)) }} y {{ date("s", strtotime($q->fecha)) }}s.
            @else
                Fecha: {{ date("d/m/Y", strtotime($q->fecha)) }} {{ date("g:i A", strtotime($q->fecha)) }} 
            @endif
        </td>
        <td>
            <a href="{{ route('modulos.mesapartes.td_folios_view', $q->id_folio) }}" class="bandejTool btn-cursor"  data-tippy-content="Ver Expediente" >
                {{ $q->firma }} <br /> {{ $q->asunto }} <br /> {{ $q->obs }} 
            </a>  
        </td>
        <td>
            <?php
                $currentDate = Carbon\Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));
                $shippingDate = Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $q->fecha);

                $diferencia_en_dias = $currentDate->diffInDays($shippingDate);

                $dias = 7 - $diferencia_en_dias;
                // var_dump($diferencia_en_dias);  
            ?>
            @if ( $diferencia_en_dias >= 7 )
                <span class="text-danger">Vencido</span>
            @elseif( $diferencia_en_dias < 7 )                 
                <span class="text-success">{{ $dias }} días</span>
            @endif
        </td>
        <td>
            <button type="button" class="btn btn-nocolor bandejTool" data-toggle="modal" data-target="#large-Modal" onclick="btnModalArchivos('{{ $q->id_folio }}')" data-tippy-content="Ver Archivos adjuntos al expediente"><i class="fa fa-cloud-download"></i></button>
        </td>
        <td class="inline">
            <a href="{{ route('modulos.mesapartes.td_folios_edit', $q->id_folio) }}" class="btn btn-sm nobtn"><i class="fa fa-pencil-square-o"></i>  Editar</a><br />
            <a href="" class="btn btn-sm nobtn"><i class="fa fa-print"></i> Cargo</a>
        </td>
    </tr>
    
@endforeach
<script>
    tippy(".bandejTool", {
        allowHTML: true,
        followCursor: true,
    });
</script>