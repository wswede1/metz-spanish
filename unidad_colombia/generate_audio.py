"""
Colombia Unit — Audio Generation Script
========================================
Uses Microsoft Edge TTS (edge-tts) — free, no API key, neural-quality Spanish voices.

Voices:
  es-MX-DaliaNeural  →  female, warm, clear  (L2 / language learner readings)
  es-MX-JorgeNeural  →  male, measured, calm  (Heritage readings)

HOW TO RUN IN GOOGLE COLAB:
  1. Go to colab.research.google.com → New notebook
  2. Paste each # ── CELL block into a separate code cell (Ctrl+M B to add cells)
  3. Runtime → Run all  (or run cells top to bottom)
  4. Cell 5 will auto-download colombia_audio.zip to your computer
  5. Unzip it, then copy:
       sp1-*.mp3  →  span_1/unidad_colombia/student_site/audio/
       sp2-*.mp3  →  span_2/unidad_colombia/student_site/audio/
  6. git add + git push — the 🔊 Listen button on every reading page will instantly
     upgrade from browser TTS to the pre-generated neural audio.
"""

# ── CELL 1 ─────────────────────────────────────────────────────────────────────
# Install edge-tts (takes ~10 seconds)
# ──────────────────────────────────────────────────────────────────────────────
# !pip install edge-tts -q

# ── CELL 2 ─────────────────────────────────────────────────────────────────────
# Imports and config
# ──────────────────────────────────────────────────────────────────────────────
import asyncio
import re
import zipfile
from pathlib import Path
import edge_tts

FEMALE = "es-MX-DaliaNeural"   # L2 readings
MALE   = "es-MX-JorgeNeural"   # Heritage readings

OUT = Path("colombia_audio")
OUT.mkdir(exist_ok=True)

def clean(text):
    """Collapse paragraph breaks into a period + space so the TTS pauses naturally."""
    t = re.sub(r'\s*\n\n+\s*', '.  ', text.strip())
    t = re.sub(r'\s+', ' ', t)
    return t.strip()

print("Setup complete. Voices:", FEMALE, "/", MALE)


# ── CELL 3 ─────────────────────────────────────────────────────────────────────
# Passage data — (output_filename, voice, text)
# ──────────────────────────────────────────────────────────────────────────────
PASSAGES = [

    # ── Spanish 1 — Day 4 L2 ───────────────────────────────────────────────────
    ("sp1-day-04-reading-l2.mp3", FEMALE,
     """Sofía vive en Medellín con su familia. Cada mañana, come fruta y bebe café con leche
antes de salir para la escuela. Su desayuno favorito es una arepa con queso.
Sofía sale de su casa a las siete de la mañana.

En el colegio, Sofía aprende mucho. En la clase de historia, ella escribe en el cuaderno
y lee sobre los diferentes departamentos de Colombia. Le gusta aprender sobre las regiones
porque quiere viajar un día. Su profesora es muy interesante.

Después de la escuela, a Sofía le gusta bailar y escuchar música con sus amigas.
También le gusta leer sobre los animales de Colombia. Ella y su amiga Valentina corren
en el parque de su barrio tres veces por semana.

Los fines de semana, la familia de Sofía va al mercado para comprar frutas y verduras.
Su papá bebe café mientras camina entre los puestos. Sofía comparte la lista de compras
con su mamá. Después del mercado, toda la familia come junta en casa."""),

    # ── Spanish 1 — Day 4 Heritage ─────────────────────────────────────────────
    ("sp1-day-04-reading-heritage.mp3", MALE,
     """En Colombia, el colegio es una institución central en la vida de los jóvenes.
Los estudiantes generalmente llegan temprano — muchos salen de su casa antes de las siete
de la mañana, incluso en días fríos en ciudades como Bogotá o Medellín, donde las
temperaturas pueden bajar bastante en las mañanas.

Valentina vive en el barrio Laureles, en Medellín. Ella estudia en un colegio público donde
hay más de ochocientos estudiantes. Por la mañana, come una arepa con huevo antes del
madrugón al bus. En el colegio, aprende matemáticas, español, inglés, y ciencias sociales.
A ella le gusta especialmente la clase de ciencias porque los temas siempre conectan con
el medio ambiente colombiano.

El recreo, que dura veinte minutos, es un momento muy esperado. Los estudiantes corren,
hablan, comen snacks como chitos o papas, y a veces escuchan música en grupo con audífonos
compartidos. Este tiempo social es una parte esencial del día escolar que muchos adultos
colombianos recuerdan con mucha alegría.

Después del colegio, Valentina va directamente a casa porque su mamá trabaja y ella cuida
a su hermano menor. Los fines de semana, la familia camina al mercado del barrio y compra
ingredientes para la semana. Esta rutina semanal es una tradición que conecta a la familia
con su comunidad local y con la historia del barrio donde viven desde hace tres generaciones."""),

    # ── Spanish 1 — Day 7 L2 ───────────────────────────────────────────────────
    ("sp1-day-07-culture-l2.mp3", FEMALE,
     """Colombia es uno de los países más famosos del mundo por su café. El café crece en las
montañas de una región que se llama el eje cafetero. En esta región, hay muchas fincas
donde familias trabajan juntas durante la cosecha para recoger los granos.

El café es muy importante para la economía de Colombia. Muchas familias viven de la venta
del café. Los granos colombianos son especiales porque crecen a una altura que les da un
sabor suave y rico. Por eso, el café de Colombia se exporta a muchos países del mundo.

El Biblioburro es un proyecto famoso en Colombia. Un hombre llamado Luis Soriano lleva
libros a niños en zonas rurales usando burros. Este proyecto muestra que los colombianos
cuidan a su comunidad de maneras creativas. El café y el Biblioburro son dos ejemplos de
cómo Colombia conecta trabajo, cultura y comunidad."""),

    # ── Spanish 1 — Day 7 Heritage ─────────────────────────────────────────────
    ("sp1-day-07-culture-heritage.mp3", MALE,
     """El café colombiano no es simplemente un producto de exportación; es una expresión de
identidad nacional. Desde el siglo XIX, el cultivo del café transformó la economía
colombiana y creó una clase media rural que antes no existía. Las familias cafeteras de
la región del eje cafetero construyeron un modo de vida basado en el trabajo colectivo,
la tierra, y la estabilidad generacional.

Para muchas comunidades en Antioquia, Caldas, y Risaralda, el café representa más que el
sustento económico. Es un sistema de valores — de paciencia, de trabajo compartido, y de
respeto por el ciclo de la naturaleza. Durante la cosecha, familias enteras, incluyendo
abuelos y niños pequeños, participan en la recolección de los granos. Este proceso
refuerza los lazos comunitarios y transmite conocimiento de una generación a la siguiente.

Sin embargo, el mundo del café colombiano enfrenta desafíos modernos. El cambio climático
amenaza las condiciones ideales de cultivo. Las nuevas generaciones de jóvenes rurales a
veces prefieren migrar a las ciudades en busca de oportunidades diferentes. Esto plantea
una pregunta fundamental: ¿cómo puede Colombia preservar este patrimonio cultural mientras
se adapta a un mundo en cambio constante?

El Paisaje Cultural Cafetero, declarado Patrimonio de la Humanidad por la UNESCO en 2011,
representa un intento de respuesta a esta pregunta. Al reconocer no solo el producto sino
también la arquitectura, las tradiciones, y las prácticas culturales de la región cafetera,
Colombia afirma que el valor del café va más allá de su precio en el mercado internacional.
Es, en suma, una historia de quién es Colombia y cómo llegó a serlo."""),

    # ── Spanish 2 — Day 4 L2 ───────────────────────────────────────────────────
    ("sp2-day-04-reading-l2.mp3", FEMALE,
     """La familia Restrepo viajó a Cartagena durante el mes de julio. Llegaron al aeropuerto
a las diez de la mañana y tomaron un taxi al hotel. El hotel estaba cerca del casco
antiguo, la parte histórica de la ciudad.

El primer día, caminaron por las murallas de la ciudad. Desde arriba, vieron el mar
Caribe y sacaron muchas fotos. La mamá leyó información sobre la historia de las murallas
en su teléfono y le explicó todo a los niños. Ellos escucharon con atención.

En el mercado de Bazurto, probaron frutas tropicales que no conocían antes: maracuyá,
lulo, y níspero. El papá pagó con efectivo y creyó que los precios eran muy buenos.
La familia comió en un restaurante cerca del mercado y pidió arepas de huevo,
que son un plato típico de la costa caribeña.

Antes de regresar al hotel, los niños corrieron en la Plaza de los Coches y oyeron a
músicos tocar vallenato. Fue un día largo pero todos dijeron que fue uno de los mejores
días de sus vidas."""),

    # ── Spanish 2 — Day 4 Heritage ─────────────────────────────────────────────
    ("sp2-day-04-reading-heritage.mp3", MALE,
     """Cartagena de Indias fue fundada en 1533 por los españoles y se convirtió en uno de los
puertos más importantes del comercio colonial en América. Durante siglos, fue el centro
de un sistema brutal: el tráfico de personas esclavizadas procedentes de África Occidental.
Esta historia —incómoda pero fundamental— dejó un legado cultural profundo que todavía se
manifiesta en la música, la gastronomía, las tradiciones religiosas y los rasgos físicos
de la mayoría de los cartageneros actuales.

En el siglo XX, Cartagena se transformó en un destino turístico internacional. La UNESCO
declaró su centro histórico amurallado Patrimonio de la Humanidad en 1984, reconociendo no
solo la arquitectura colonial sino también el valor cultural acumulado de siglos de historia.
Sin embargo, esta distinción trajo consigo una tensión real: la restauración del casco
antiguo para el turismo desplazó gradualmente a las comunidades de bajos recursos que
habían vivido allí durante generaciones.

Hoy, Cartagena es simultáneamente una ciudad de contrastes profundos. Sus barrios
turísticos como Getsemaní experimentaron lo que los urbanistas llaman gentrificación —
un proceso en el que la inversión y el turismo transformaron el carácter de vecindarios
históricos, aumentando los precios y empujando a los residentes originales hacia la
periferia. Al mismo tiempo, Getsemaní se convirtió en un símbolo de resistencia cultural:
artistas, músicos, y activistas afrodescendientes reclamaron su historia y su espacio
público mediante el arte y la organización comunitaria.

La historia de Cartagena invita a reflexionar sobre una pregunta universal: ¿quién tiene
el derecho de contar la historia de un lugar y quién se beneficia de su preservación?
Esta pregunta no tiene respuesta fácil, pero es exactamente la que una ciudad como
Cartagena — con sus murallas, sus memoriales, y sus barrios en transformación —
nos obliga a hacernos."""),

    # ── Spanish 2 — Day 7 L2 ───────────────────────────────────────────────────
    ("sp2-day-07-culture-l2.mp3", FEMALE,
     """Colombia tiene una historia musical muy rica. La cumbia nació en la región caribeña y
se mezcló con tradiciones africanas, indígenas, y europeas. Por siglos, la gente bailó
cumbia en celebraciones y festividades de las comunidades costeras.

El vallenato también tiene una historia larga. Se originó en el norte de Colombia y mezcló
el acordeón — que llegó de Europa — con ritmos e instrumentos africanos e indígenas.
Grandes cantantes como Carlos Vives grabaron versiones modernas del vallenato en los años
noventa y llevaron esta música a todo el mundo.

En 2015, la UNESCO declaró el vallenato Patrimonio Cultural Inmaterial de la Humanidad.
Esta declaración reconoció la importancia histórica y cultural de la música para las
comunidades del norte de Colombia. Para muchas familias de esa región, el vallenato no es
solo entretenimiento — es una forma de recordar de dónde vienen y qué vivieron sus abuelos."""),

    # ── Spanish 2 — Day 7 Heritage ─────────────────────────────────────────────
    ("sp2-day-07-culture-heritage.mp3", MALE,
     """Cuando la UNESCO declaró el vallenato Patrimonio Cultural Inmaterial de la Humanidad en
2015, Colombia celebró el reconocimiento como una validación internacional de su identidad
cultural. Sin embargo, este tipo de declaraciones raramente son simples: al nombrar una
práctica cultural como patrimonio, se crea automáticamente una tensión entre la
preservación auténtica y la presentación para el consumo externo.

El vallenato nació de una fusión de tradiciones africanas, indígenas, y europeas en la
región del Caribe colombiano. Durante generaciones, fue una música profundamente local —
cantada en parrandas familiares, en mercados, y en celebraciones de comunidades rurales
del departamento del Magdalena y La Guajira. Su llegada a las ciudades en el siglo XX fue
el comienzo de una transformación que se aceleró con la popularización internacional del
género por artistas como Carlos Vives en la década de los noventa.

La versión del vallenato que conoce el mundo hoy es, en muchos sentidos, una versión
editada. Las letras más complejas sobre violencia, amor prohibido, o crítica social que
caracterizaban al vallenato clásico con frecuencia desaparecen de las versiones
comerciales. El Festival de la Leyenda Vallenata en Valledupar, que empezó como un evento
local en 1968, se convirtió en un espectáculo nacional e internacional — con todo lo que
eso implica para la dinámica entre los músicos tradicionales y la industria cultural.

¿Significa esto que el vallenato está en peligro? No necesariamente. La vitalidad de una
expresión cultural no depende solo de su pureza original, sino de su capacidad para ser
reinterpretada por nuevas generaciones sin perder su núcleo esencial. La pregunta más
productiva no es: ¿es auténtico?, sino: ¿quién lo interpreta, para quién, y bajo qué
condiciones económicas y culturales?"""),
]

print(f"Loaded {len(PASSAGES)} passages.")
for fname, voice, _ in PASSAGES:
    print(f"  {fname}  ←  {voice}")


# ── CELL 4 ─────────────────────────────────────────────────────────────────────
# Generate all MP3 files  (~30–60 seconds total)
# ──────────────────────────────────────────────────────────────────────────────
async def make(filename, voice, text):
    path = OUT / filename
    comm = edge_tts.Communicate(clean(text), voice, rate="-8%")
    await comm.save(str(path))
    kb = path.stat().st_size // 1024
    print(f"  ✓  {filename}  ({kb} KB)")

async def run_all():
    print("Generating...\n")
    for fname, voice, text in PASSAGES:
        await make(fname, voice, text)
    print(f"\nAll done — {len(PASSAGES)} files in {OUT}/")

await run_all()


# ── CELL 5 ─────────────────────────────────────────────────────────────────────
# Zip and download
# ──────────────────────────────────────────────────────────────────────────────
from google.colab import files

ZIP = "colombia_audio.zip"
with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
    for mp3 in sorted(OUT.glob("*.mp3")):
        zf.write(mp3, mp3.name)

total_kb = Path(ZIP).stat().st_size // 1024
print(f"Zipped {len(list(OUT.glob('*.mp3')))} files → {ZIP} ({total_kb} KB)")
files.download(ZIP)


# ── AFTER DOWNLOADING ──────────────────────────────────────────────────────────
# 1. Unzip colombia_audio.zip
# 2. In Terminal, from the repo root:
#
#    cp ~/Downloads/colombia_audio/sp1-*.mp3  span_1/unidad_colombia/student_site/audio/
#    cp ~/Downloads/colombia_audio/sp2-*.mp3  span_2/unidad_colombia/student_site/audio/
#
#    git add span_1/unidad_colombia/student_site/audio/
#    git add span_2/unidad_colombia/student_site/audio/
#    git commit -m "Add neural TTS audio for all reading passages"
#    git push origin main
#
# The 🔊 Listen button on every reading page will now play the MP3 files.
# Web Speech API is still used as a fallback for word-click pronunciation.
