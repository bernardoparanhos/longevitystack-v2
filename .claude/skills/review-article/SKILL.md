---
name: review-article
description: Revisa e aplica um artigo trazido por Bernardo no chat do Claude.ai Project ao site LongevityStack — identifica o pilar correto, cria o MDX com frontmatter completo, aplica a estrutura SEO/answer-first, verifica interlinking e monetização contra as regras do projeto, roda o checklist Go/No-Go do SEO-STANDARD.md e atualiza o log diário. Use quando Bernardo colar o texto de um artigo novo e pedir para incorporar/aplicar ao site.
---

# Skill: review-article

## Quando usar
Quando Bernardo trouxer o texto completo de um artigo novo e pedir para incorporar ao projeto.

## Antes de qualquer ação
Ler `_docs/PROJECT.md`, `_docs/SEO-STANDARD.md`, `_docs/INTERLINKING-MAP.md`, `_docs/MONETIZATION-MAP.md` e `_docs/CONTENT-ARCHITECTURE.md`. Essas regras mudam com o tempo — nunca aplicar de memória.

## O que fazer, em ordem

### 1. IDENTIFICAR O PILAR
Ler o artigo e identificar em qual collection ele entra (understand / protocols / compounds / gear / field-notes). O pilar define o schema Zod e o layout usado.

### 2. CRIAR O ARQUIVO MDX
Criar o arquivo em `src/content/{pilar}/{slug}.mdx` com:
- Frontmatter completo com todos os campos do schema Zod do `content.config.ts` para aquele pilar (nunca deixar campo obrigatório vazio)
- `lastReviewed` com a data de hoje no formato YYYY-MM-DD
- O conteúdo do artigo convertido para MDX

### 3. APLICAR ESTRUTURA VISUAL
Dentro do MDX, garantir que existem:
- Bloco ANSWER-FIRST logo após o título (texto em negrito, 2-4 frases)
- Disclaimer de posicionamento de engenharia
- Blocos de evidência formatados como tabela (Study type | n | Population | Funding | Result)
- Slots de imagem com comentário TODO onde o artigo menciona visual ou dado próprio: `<!-- TODO: imagem/gráfico aqui - [descrição do que mostrar] -->`
- Seção "What we don't know" se o pilar for Understand ou Compounds
- Seção FAQ com FAQPage schema
- Referências numeradas com link PubMed/DOI

### 4. VERIFICAR INTERLINKING
Ler INTERLINKING-MAP.md e garantir que o artigo tem:
- Link ascendente para o hub do pilar (com anchor descritivo)
- 2-3 links para spokes irmãos existentes (só linkar artigos que já existem em `src/content/`)
- 1 ponte para outro pilar quando o contexto permitir
- Marcar como TODO os links para artigos que ainda não existem

### 5. VERIFICAR MONETIZAÇÃO
Ler MONETIZATION-MAP.md e verificar a camada do pilar:
- Understand e Field Notes: confirmar que não há link de afiliado
- Protocols: comércio leve apenas se contextualmente justificado
- Compounds: Amazon Associates só depois do mecanismo e evidência, nunca no topo
- Gear: afiliado direto com disclosure inline obrigatório
Todos os links de afiliado com `rel="noopener noreferrer nofollow sponsored"`

### 6. RODAR O CHECKLIST GO/NO-GO
Verificar cada item do SEO-STANDARD.md e reportar:
- ✅ passou
- ❌ precisa de ajuste (com o que fazer)
- TODO (requer dado real que só Bernardo tem)

Itens do checklist:
- [ ] Abre com BLUF em negrito
- [ ] Disclaimer de engenharia presente
- [ ] Todas as fontes são PubMed/DOI
- [ ] Cada claim tem study type, n e funding
- [ ] "What we don't know" presente (Understand e Compounds)
- [ ] Linguagem de parâmetro, não adjetivo
- [ ] Nenhuma promessa de cura
- [ ] FAQ presente
- [ ] Schema correto para o pilar no frontmatter
- [ ] Interlinking completo (hub + irmãos + ponte)
- [ ] Monetização na camada correta do pilar
- [ ] Todos os afiliados com rel e disclosure inline
- [ ] Meta title e description no frontmatter
- [ ] Slots de imagem marcados com TODO onde necessário

### 7. REPORTAR
Ao terminar, mostrar:
- Caminho do arquivo criado
- Checklist Go/No-Go preenchido
- Lista de TODOs que Bernardo precisa resolver (fontes, imagens, links de artigos ainda não escritos)
- Comando para rodar o servidor e conferir: `npm run dev`

### 8. ATUALIZAR LOG
Criar ou atualizar `_docs/logs/AAAA-MM-DD.md` com o artigo aplicado, decisões tomadas e TODOs pendentes.
