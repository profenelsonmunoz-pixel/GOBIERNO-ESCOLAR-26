
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SCHOOL_CONTEXT = `
Institución Educativa Nuestra Señora de la Candelaria (IENSECAN).
Base de conocimiento: Circular 007 del 28 de Enero de 2026 (SED Valle del Cauca).

CRONOGRAMA ELECTORAL 2026 (OFICIAL):
- Feb 2 - 13: Sensibilización sobre democracia escolar.
- Feb 16 - 20: Inscripción de Candidatos.
- Feb 23 - 27: Verificación de requisitos.
- Feb 23 - Mar 4: Periodo de Campaña.
- Mar 2 - 4: Selección de Jurados.
- Mar 13: DÍA ELECTORAL.
- Mar 13: Cierre y Conteo de Mesas.
- Mar 16 - 18: Escrutinio General.
- Mar 20: Publicación de Resultados y Posesión.

MARCO LEGAL Y ROLES:
1. Personero Estudiantil (Grado 11°):
   - Base Legal: Ley 115 de 1994 (Art 142), Decreto 1075 de 2015.
   - Función: Promover derechos y deberes, recibir quejas, presentar solicitudes al Rector, apelar ante Consejo Directivo.

2. Contralor Estudiantil (Grado 10°):
   - Base Legal: Ordenanza 595 de 2022.
   - Función: Control social a recursos (PAE, fondos), cuidar bienes, promover transparencia.
`;

export const generateAIResponse = async (prompt: string) => {
  const ai = getAI();
  const systemInstruction = `
    Actúa como un experto orientador escolar y autoridad en democracia estudiantil de la IENSECAN.
    ${SCHOOL_CONTEXT}
    **DIRECTRICES:**
    - Responde siempre basándote en estas fechas y leyes.
    - Sé motivador, invitando a la participación pacífica y democrática.
    - Si te preguntan por fechas, sé exacto con el cronograma.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con el asistente de IA. Por favor, intenta más tarde.";
  }
};

export const generateCampaignStrategy = async (name: string, role: string, focus: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perfil: Nombre: ${name}, Cargo: ${role}, Tema: ${focus}. Genera slogan y propuestas.`,
      config: {
        systemInstruction: `
          Actúa como un estratega de marketing político escolar de la IENSECAN.
          ${SCHOOL_CONTEXT}
          Asegúrate de que las propuestas sean viables y correspondan a las funciones legales del cargo seleccionado (${role}).
          Genera un slogan corto de alto impacto y 2 propuestas breves basadas en el tema central.
          Formato: Markdown legible.
        `
      }
    });
    return response.text || "Error generando la estrategia.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al generar la campaña.";
  }
};

export const generateDebateAnalysis = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tema de la propuesta: "${topic}"`,
      config: {
        systemInstruction: `
          Eres un entrenador de debate escolar de la IENSECAN.
          ${SCHOOL_CONTEXT}
          Genera 2 argumentos fuertes A FAVOR y 2 posibles CONTRA-ARGUMENTOS que usaría un oponente.
          Sé breve, educativo y usa un lenguaje apropiado para estudiantes.
          Verifica si la propuesta es legalmente viable según las funciones del gobierno escolar.
        `
      }
    });
    return response.text || "Error analizando el debate.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al preparar el debate.";
  }
};
