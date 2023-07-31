@foreach ($query as $i => $q)
    <tr>
        <td>{{ $i }}</td>
        <td>
            <a href="{{ route('admin.ver_empleados', $q->id) }}" class="bandejTool btn-cursor" >
                {{ $q->apellido }}, {{ $q->nombre }}
            </a>
        </td>
        <td>
            @if ($q->tot == '0')
                <strong>NO</strong>
            @else
                SI
            @endif
        </td>
        <td>{{ $q->onombre }}</td>
        <td>
            @if ($q->encargado == '0')
                <strong>NO</strong>
            @else
                SI
            @endif
        </td>
        <td>{{ $q->cargo }}</td>
        <td>
            <button type="buttom" class="btn nobtn" data-toggle="modal" data-target="#large-Modal" onclick="btnModalEmpEdit('{{ $q->id }}')"><i class="icofont icofont-edit text-success" ></i>Editar</button>
            <button type="buttom" class="btn nobtn" ><i class="icofont icofont-close-circled text-danger"></i>Elimnar</button>
        </td>
    </tr>    
@endforeach