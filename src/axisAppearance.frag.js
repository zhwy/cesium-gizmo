export default `
#ifdef VECTOR_TILE
uniform vec4 u_highlightColor;
#endif

varying vec2 v_st;
varying vec4 v_color;

void main()
{
    czm_materialInput materialInput;

    vec2 st = v_st;
    st.t = czm_readNonPerspective(st.t, gl_FragCoord.w);

    materialInput.s = st.s;
    materialInput.st = st;
    materialInput.str = vec3(st, 0.0);

    czm_material material = czm_getMaterial(materialInput);
    gl_FragColor = vec4((material.diffuse + material.emission) * v_color.rgb, material.alpha * v_color.w);
#ifdef VECTOR_TILE
    gl_FragColor *= u_highlightColor;
#endif

    czm_writeLogDepth();
}
`