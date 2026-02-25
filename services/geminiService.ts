
import { GoogleGenAI } from "@google/genai";

// =============================================================================================
// 🔑 ZONA DE CONFIGURACIÓN DE LA API KEY (IMPORTANTE)
// =============================================================================================
// Si no estás usando un archivo .env, puedes pegar tu API Key de Google Gemini directamente aquí.
// 1. Consigue tu llave en: https://aistudio.google.com/app/apikey
// 2. Pégala dentro de las comillas vacías abajo.
//
// Ejemplo: const MANUAL_API_KEY = "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
// =============================================================================================

const MANUAL_API_KEY = "AIzaSyCVyDSjRs3rSvytr4fYY9KyP4Mje6fDZvE"; 

// =============================================================================================

const getAI = () => new GoogleGenAI({ 
  apiKey: MANUAL_API_KEY || process.env.API_KEY || "AIzaSyCVyDSjRs3rSvytr4fYY9KyP4Mje6fDZvE" 
});

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
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      }
    });
    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      return "⚠️ Has excedido tu cuota diaria gratuita de la API. Por favor intenta mañana o usa otra API Key.";
    }
    return `Error: ${error.message || "Intenta más tarde."}`;
  }
};

export const generateCampaignStrategy = async (name: string, role: string, focus: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Perfil: Nombre: ${name}, Cargo: ${role}, Tema: ${focus}. Genera slogan y propuestas.`,
      config: {
        systemInstruction: `
          Actúa como un estratega de marketing político escolar de la IENSECAN.
          ${SCHOOL_CONTEXT}
          Asegúrate de que las propuestas sean viables y correspondan a las funciones legales del cargo seleccionado (${role}).
          Genera un slogan corto de alto impacto y 2 propuestas breves basadas en el tema central.
          Formato: Markdown legible.
        `,
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      }
    });
    return response.text || "Error generando la estrategia.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      return "⚠️ Cuota excedida. Intenta mañana.";
    }
    return `Error: ${error.message || "Intenta más tarde."}`;
  }
};

export const generateDebateAnalysis = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Tema de la propuesta: "${topic}"`,
      config: {
        systemInstruction: `
          Eres un entrenador de debate escolar de la IENSECAN.
          ${SCHOOL_CONTEXT}
          Genera 2 argumentos fuertes A FAVOR y 2 posibles CONTRA-ARGUMENTOS que usaría un oponente.
          Sé breve, educativo y usa un lenguaje apropiado para estudiantes.
          Verifica si la propuesta es legalmente viable según las funciones del gobierno escolar.
        `,
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      }
    });
    return response.text || "Error analizando el debate.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      return "⚠️ Has excedido el límite de uso gratuito de la IA. Por favor intenta más tarde o mañana.";
    }
    return `Error al preparar el debate: ${error.message || "Intenta de nuevo."}`;
  }
};
