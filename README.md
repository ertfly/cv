# ericteixeira.com.br

Currículo de Eric Rozetti Teixeira publicado como site estático.
HTML + CSS puro, sem build e sem dependências de runtime — o que está no repositório é exatamente o que vai para o ar.

## Estrutura

```
index.html               versão pt-BR (padrão)
en/index.html            versão em inglês
assets/style.css         design system + estilos de tela e de impressão
assets/main.js           seção ativa no menu + persistência do idioma escolhido
.github/workflows/       deploy automático no GitHub Pages
CNAME                    domínio próprio
.nojekyll                impede o processamento pelo Jekyll
```

## Idiomas

Duas páginas estáticas independentes: `/` em português e `/en/` em inglês.

- Um script inline no `<head>` decide o idioma **antes da renderização** (sem piscar):
  navegador em português fica em `/`, qualquer outro idioma vai para `/en/`.
- O seletor `lang · pt-br / en` no topo da coluna esquerda grava a escolha em
  `localStorage` — a partir daí a preferência manual manda, e o navegador é ignorado.
- Cada página declara `hreflang` para pt-BR, en e x-default, então o Google indexa
  as duas versões corretamente mesmo com o redirecionamento por JS.
- Sem JavaScript, `/` abre em português e o link do seletor continua funcionando.

> **Ao editar o currículo, atualize os dois arquivos.** É o custo de manter o site
> sem build; em troca, cada idioma é uma página estática real, indexável e imprimível.

## Rodar localmente

Basta abrir o `index.html` no navegador. Se preferir servir por HTTP:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Editar o conteúdo

Tudo está em `index.html`, em blocos comentados por seção (`RAIL`, `RESUMO`,
`REALIZAÇÕES`, `EXPERIÊNCIA`, `HABILIDADES`, `FORMAÇÃO`).

- **Nova experiência:** duplicar um `<li class="job">` e colocá-lo no topo da `<ol class="timeline">` (ordem cronológica reversa). O primeiro item da lista recebe o marcador destacado automaticamente.
- **Destacar um número:** envolver com `<span class="num">…</span>` — aplica cor de destaque e numerais tabulares.
- **Nova skill:** adicionar um `<li>` dentro do `.skillset` correspondente.
- Ao alterar dados de contato, atualizar também o bloco JSON-LD no fim do arquivo.

## Gerar o PDF

`Ctrl+P` no navegador. Existe um `@media print` dedicado: fundo branco, tipografia
reduzida, menu e efeitos removidos, blocos de experiência sem quebra no meio.

## Deploy

Todo push na `main` dispara o workflow `.github/workflows/deploy.yml`, que publica
o repositório inteiro no GitHub Pages. Não há etapa de build.

### Configuração inicial (uma vez)

1. **Settings → Pages → Source:** selecionar **GitHub Actions**.
2. **Settings → Pages → Custom domain:** informar `ericteixeira.com.br`.
3. No provedor de DNS do domínio:

   | Tipo    | Nome  | Valor             |
   |---------|-------|-------------------|
   | A       | `@`   | `185.199.108.153` |
   | A       | `@`   | `185.199.109.153` |
   | A       | `@`   | `185.199.110.153` |
   | A       | `@`   | `185.199.111.153` |
   | CNAME   | `www` | `ertfly.github.io.` |

4. Após a propagação (`dig ericteixeira.com.br +short`), marcar **Enforce HTTPS**.

> O arquivo `CNAME` já está versionado. Se o domínio mudar, alterar o arquivo **e** o
> campo em Settings → Pages, além das metatags `og:url` / `canonical` no `index.html`.
