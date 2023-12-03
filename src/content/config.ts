import { defineCollection, z } from 'astro:content';

const gdr = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		livelloBibliografico : z.string(),
		tipoDiDocumento : z.string(),
		autorePrincipale : z.string(),
		titolo: z.string(),
		pubblicazione : z.string(),
		descrizioneFisica : z.string(),
		titoloDiOpera : z.string(),
		soggetti : z.string(),
		sistemaDiGioco : z.string(),
		ambientazione : z.string(),
		giocoAdattoA : z.enum(["One Shot", "Campagne Brevi", "Campagne Lunghe"]),
		gradoDiPreparazione : z.enum(["nullo", "basso", "medio", "alto"]),
		master : z.boolean(),
		numeroDiGiocatoriMIN : z.number().nonnegative(),
		numeroDiGiocatoriMAX : z.number().nonnegative(),
		etaConsigliata : z.string(),
		linguaDiPubblicazione : z.string(),
		linguaOperaOriginale: z.string(),
		paeseDiPubblicazione: z.string(),
		codiceIdentificativo : z.string(),
		regaloDiVanessa: z.boolean()
	}),
});

export const collections = { gdr };
