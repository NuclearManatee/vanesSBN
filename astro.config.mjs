import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import NetlifyCMS from 'astro-netlify-cms';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://vanes-sbn.netlify.app/',
  integrations: [
    sitemap(), 
    tailwind(),
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'master',
        },
        collections: [
          {
            name : 'gdr',
            label : 'Giochi di Ruolo',
            folder : 'src/content/gdr',
            create : true,
            identifier_field : 'titolo', 
            fields: [
              { name : 'titolo', widget : 'string', label: 'Titolo' },  
              { name : 'livelloBibliografico', widget : 'string', label: 'Livello Bibliografico' },
              { name : 'tipoDiDocumento', widget : 'string', label: 'Tipo di Documento' },
              { name : 'autorePrincipale', widget : 'string', label: 'Autore Principale' },
              { name : 'pubblicazione', widget : 'string', label: 'Pubblicazione' },
              { name : 'descrizioneFisica', widget : 'string', label: 'Descrizione Fisica' },
              { name : 'titoloDiOpera', widget : 'string', label: 'Titolo di Opera' },
              { name : 'soggetti', widget : 'string', label: 'Soggetti' },
              { name : 'sistemaDiGioco', widget : 'string', label: 'Sistema di Gioco' },
              { name : 'ambientazione', widget : 'string', label: 'Ambientazione' },
              { name : 'giocoAdattoA', widget : 'select', label: 'Gioco adatto a', options: ["One Shot", "Campagne Brevi", "Campagne Lunghe"] },
              { name : 'gradoDiPreparazione', widget : 'select', label: 'Grado di Preparazione', options: ["nullo", "basso", "medio", "alto"] },
              { name : 'master', widget : 'boolean', label: 'Master', default: true},
              { name : 'numeroDiGiocatoriMIN', widget : 'number', label: 'Numero di giocatori (MIN)', min: 1, max: 12},
              { name : 'numeroDiGiocatoriMAX', widget : 'number', label: 'Numero di giocatori (MAX)', min: 1, max: 99},
              { name : 'etaConsigliata', widget : 'string', label: 'Età Consigliata' },
              { name : 'linguaDiPubblicazione', widget : 'string', label: 'Lingua di Pubblicazione' },
              { name : 'linguaOperaOriginale', widget : 'string', label: 'Lingua Opera Originale' },
              { name : 'paeseDiPubblicazione', widget : 'string', label: 'Paese di Pubblicazione' },
              { name : 'codiceIdentificativo', widget : 'string', label: 'Codice Identificativo' },
              { name : 'regaloDiVanessa', widget : 'boolean', label: 'Regalo di Vanessa', default: false}
            ]

          }
        ],
      },
    }),
    react()
  ]
});