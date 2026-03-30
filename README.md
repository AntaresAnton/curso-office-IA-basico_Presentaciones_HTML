# Curso Office Básico + IA (Material de Presentaciones)

Repositorio con el material base para impartir un curso de Office básico apoyado con IA.  
Incluye guiones didácticos por cápsula, presentaciones HTML listas para mostrar y versiones en formato inline para publicación en Moodle.

## Objetivo del repositorio

Centralizar y organizar todos los recursos de presentación del curso:

- Guiones por cápsula (estructura pedagógica y narrativa).
- Presentaciones HTML por cápsula (material visual para clase).
- Material complementario para LMS (Moodle inline).
- Recursos compartidos de estilo y comportamiento (CSS/JS).

## Estructura general

- 6 módulos temáticos.
- 31 guiones HTML en total.
- 31 presentaciones HTML en total.
- Recursos raíz para bienvenida, hoja de ruta, glosario, manifiesto y quiz.

Cada módulo sigue, en general, esta estructura:

```text
Módulo X .../
	Guiones/
		guion_capsula_X_Y.html
	Material de Apoyo/
		presentacion_capsula_X_Y.html
		main.js (según módulo)
		styles.css (según módulo)
		styles_appendix.css (según módulo)
```

## Contenido por módulo

### Módulo 1 - Introducción a Microsoft Office + IA

- Guiones: `guion_capsula_1_1.html` a `guion_capsula_1_5.html`.
- Presentaciones: `presentacion_capsula_1_1.html` a `presentacion_capsula_1_5.html`.
- Recursos de apoyo: `main.js`, `styles.css`, `styles_appendix.css`, `perfil.png`.

### Módulo 2 - Word Básico: Creación de Documentos Profesionales

- Guiones: `guion_capsula_2_1.html` a `guion_capsula_2_5.html`.
- Presentaciones: `presentacion_capsula_2_1.html` a `presentacion_capsula_2_5.html`.
- Recursos de apoyo: `main.js`, `styles.css`, `styles_appendix.css`.

### Módulo 3 - Excel Básico: Tablas, Fórmulas y Gráficos

- Guiones: `guion_capsula_3_1.html` a `guion_capsula_3_5.html` + `modulo3_evaluacion.html`.
- Presentaciones: `presentacion_capsula_3_1.html` a `presentacion_capsula_3_5.html` + `presentacion_modulo3_evaluacion.html`.
- Recursos de apoyo: `main.js`, `styles.css`, `styles_appendix.css`.

### Módulo 4 - PowerPoint Básico: Presentaciones de Impacto

- Guiones: `guion_capsula_4_1.html` a `guion_capsula_4_5.html`.
- Presentaciones: `presentacion_capsula_4_1.html` a `presentacion_capsula_4_5.html`.
- Recursos de apoyo: `main.js`, `styles.css`.

### Módulo 5 - Colaboración y Nube

- Guiones: `guion_capsula_5_1.html` a `guion_capsula_5_5.html`.
- Presentaciones: `presentacion_capsula_5_1.html` a `presentacion_capsula_5_5.html`.
- Recursos de apoyo: no incluye `main.js` ni hojas de estilo dedicadas dentro de `Material de Apoyo`.

### Módulo 6 - Proyecto Final Integrado: Flujo Completo Office + IA

- Guiones: `guion_capsula_6_1.html` a `guion_capsula_6_5.html`.
- Presentaciones: `presentacion_capsula_6_1.html` a `presentacion_capsula_6_5.html`.
- Recursos de apoyo: `main.js`, `styles.css`.

## Material transversal en la raíz

Archivos pensados para introducción, navegación del curso y publicación en LMS:

- `bienvenida.html`
- `bienvenida_moodle_inline.html`
- `hoja_de_ruta_moodle.html`
- `hoja_de_ruta_moodle_inline.html`
- `guias_introductorias_modulo_1_inline.html`
- `glosario_atajos_teclado_moodle_inline.html`
- `introduccion_ia_emprendedores_moodle_inline.html`
- `manifiesto_alumno_moodle_inline.html`
- `quiz_ia_emprendedores_inline.html`
- `nombres.txt`

## Uso recomendado

1. Abrir cada presentación HTML en navegador para impartición de cápsulas.
2. Usar los archivos de `Guiones` como base de planificación docente.
3. Publicar los archivos `*_inline.html` en Moodle cuando se requiera contenido embebido.
4. Mantener consistencia visual reutilizando los recursos CSS/JS de cada módulo.

## Convenciones de nombres

- Guiones: `guion_capsula_<modulo>_<numero>.html`
- Presentaciones: `presentacion_capsula_<modulo>_<numero>.html`
- Variantes para LMS: sufijo `_inline.html`

## Estado del proyecto

Repositorio enfocado en contenido instruccional y presentaciones HTML para un curso de Office básico con apoyo de IA.  
Puede ampliarse con nuevos módulos, evaluaciones y recursos multimedia adicionales manteniendo la misma estructura.

