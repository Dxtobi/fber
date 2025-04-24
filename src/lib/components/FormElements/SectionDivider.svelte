<script>
    import { ELEMENT_TYPES } from '$lib/utils/elementTypes';
  
    export let element;
  
    // Initialize with default values from elementTypes if not set
   // @ts-ignore
    $: color = element.attributes?.color ?? ELEMENT_TYPES.SECTION_DIVIDER.editableProperties.find(p => p.property === 'color').defaultValue;
    $: marginTop = element.attributes?.marginTop ?? ELEMENT_TYPES.SECTION_DIVIDER.editableProperties?.find(p => p.property === 'marginTop')?.defaultValue ?? 0;
    $: marginBottom = element.attributes?.marginBottom ?? ELEMENT_TYPES.SECTION_DIVIDER.editableProperties?.find(p => p.property === 'marginBottom')?.defaultValue ?? 0;
  
    // Update element attributes when local values change
    $: if (element.attributes?.color !== color || element.attributes?.marginTop !== marginTop || element.attributes?.marginBottom !== marginBottom) {
      element.attributes = {
        ...element.attributes,
        color,
        marginTop,
        marginBottom,
      };
    }
  </script>
  
  <div
    style={`
      width: 100%;
      height: 1px;
      background-color: ${color};
      margin: ${marginTop}px 0 ${marginBottom}px 0;
    `}
    class="section-divider"
  ></div>
  
  <style>
    .section-divider {
      display: block;
    }
  </style>