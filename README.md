# PlanAcademic
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/PlanAcademic.png)

## O Projeto
PlanAcademic é uma ferramenta de gestão acadêmica voltada para alunos de graduação. Com ela o aluno tem acesso à toda sua grade de disciplinas no formato de um organograma interativo. Todo o ecossistema foi pensado e desenvolvido para dar suporte a maior quantidade possível de grades curriculares das mais diversas universidades brasileiras, públicas e privadas.

A plataforma está hospedada no GuitHube Pages e pode ser acessada pelo link [https://maykowsm.github.io/PlanAcademic/](https://maykowsm.github.io/PlanAcademic/). Todo o projeto roda de forma local diretamente no navegador e pode ser baixado para rodar offline. O projeto é totalmente Open Source com licença [MIT](https://opensource.org/license/mit/).

O projeto está em constante evolução e diversas funcionalidades ainda serão implementadas, se você sabe programar e gostou do projeto considere contribuir com alguns commits, vai ser um prazer trabalhar com você, caso tenha alguma dúvida ou não sabe programar mas teve uma ideia que possa melhorar ainda mais o projeto nos mande um email no seguinte endereço: eng.maykowmenezes@gmail.com , será um prazer discutir novas ideias.

## Como usar
Antes de começar você precisa baixar um arquivo json correspondente à sua grade curricular neste link: [https://github.com/maykowsm/PlanAcademic/tree/main/cadastro_curso/JSON](https://github.com/maykowsm/PlanAcademic/tree/main/cadastro_curso/JSON) , os arquivos estão classificados por instituição e curso. 

Caso não exista nenhum arquivo correspondente à sua instituição e curso, siga as instruções [aqui](https://github.com/maykowsm/PlanAcademic/blob/main/README.md#como-gerar-o-json) de como gerar o json com base em sua grade curricular.

Com o arquivo json em seu computador acesse a [plataforma](https://maykowsm.github.io/PlanAcademic/) e na janela que se abre (janela de boas vindas) faça o upload do arquivo arrastando-o para a área demarcada ou clicando sobre ela.
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/upload%20Arquivo.png)

Ao carregar o arquivo o organograma será gerado automaticamente com todas as interdependência (pré-requisitos) entre matérias em seus respectivos semestres.
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/Organograma.png)

Ao passar o mouse sobre uma matéria será exibido as conexões de dependências com as demais matérias.
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/met%C3%A9rias.png)

Ao Clicar sobre uma matéria será exibido uma janela contendo o nome da matéria, semestre da qual pertence, carga horária, status referente a se a matéria já foi cursada, ou se está sendo cursada, um campos para definir nome do professor, nota final e anotações. Qualquer alteração nos campos será salvo ao fechar a janela.

![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/janela_mat%C3%A9ria.png)


Do lado esquerdo é exibido um menu coma as seguintes opções:
* 1 - Upload
* 2 - Salvar
* 3 - Configurações
* 4 - Ajuda

![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/menu.png)

O funcionamento de cada uma dessas opções será melhor explicado na sequencia.

### Upload
Faz Upload de um arquivo json previamente configurado (mesma função da janela de boas vindas)

### Salvar
Salva todas as alterações feitas no json e faz o dowload do mesmo em sua máquina. (OBS: A plataforma não salva nenhuma informação online, todas as informações são salvas exclusivamente no json em sua máquina, portanto a cada uso da plataforma aconselhamos fazer o salvamento do mesmo para que não haja perca de dados, lembre-se também de sempre fazer o upload do arquivo json mais recente para a plataforma.)

### Configurações
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/configura%C3%A7%C3%B5es.png)

Abre uma janela de configurações que permite configurar o comportamento da plataforma, bem como alterar o tema e modificar as cores de todos os elementos em tela, o que permite um alto nível de personalização.
Seque imagens de algumas ideias de configuração de cor.

![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/modelo-1.png)
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/modelo-2.png)
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/modelo-3.png)
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/modelo-4.png)
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/modelo-5.png)

### Ajuda
O botão de ajuda o redirecionará para esta página.

## Como gerar o json
Se você não encontrou seu curso e instituição na [lista](https://github.com/maykowsm/PlanAcademic/tree/main/cadastro_curso/JSON) você pode gerar você mesmo um json para seu curso, segue o passo a passo.

* 1 - Crie uma planilha com todas as disciplinas de sua grade curricular, a planilha deve contemplar as seguintes colunas.
  * Semestre - Semestre a qual a disciplina pertence, disciplinas optativas devem possuir número do semestre igual a 0;
  * Id - Numero de identificação da disciplina (valor numérico incrementado de 1 a cada disciplina), este id servirá para facilitar o processamento dos dados na plataforma;
  * Carga Horária - Carga horária da disciplina;
  * Nome da matéria - Nome da disciplina;
  * Dependências - Id das matérias que são pré-requisito para a disciplina em questão, caso a disciplina possua dois ou mais pré-requisitos os Ids devem ser separados por um "-", exemplo: 10-16, não adicione espaços ou qualquer outro caractere entre eles.
 
Segue uma imagem de como deve ser o cabeçalho da planilha.

![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/tabela%20csv.png)

Segue uma imagem de como deve ser escrito as dependências caso haja mais de dois pré-requisitos para uma mesma disciplina, uma planilha de exemplo pode ser baixada nesse link: [https://github.com/maykowsm/PlanAcademic/tree/main/cadastro_curso/FILES_CSV](https://github.com/maykowsm/PlanAcademic/tree/main/cadastro_curso/FILES_CSV)

![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/dependencias.png)

* 2 - Salve a planilha como um arquivo CSV.
* 3 - Abra a página de cadastro de curso no link: [https://maykowsm.github.io/PlanAcademic/cadastro_curso/](https://maykowsm.github.io/PlanAcademic/cadastro_curso/) .
* 4 - Na página de cadastro proceda da seguinte forma:
  * Preencha o campo 1 com o mome do curso
  * No campo 2 preencha com a carga horária total das disciplinas (atenção para não incluir as cargas horárias das atividades complementares e estágios).
  * Carregue o arquivo CSV clicando no botão "Upload CSV" (indicação número 3)
  * Por fim Clique em "Dowload Arquivo" para baixar em sua máquina o arquivo json pronto para ser usado no [PlaAcademic](https://maykowsm.github.io/PlanAcademic/) (indicação 4)
![](https://github.com/maykowsm/PlanAcademic/blob/main/img/img_readme/Cadastro%20de%20curso.png)

Caso apareça alguma mensagem de erro, revise os dados da planilha para certificar que está tudo conforme o passo a passo, e tente novamente, caso o erro persista entre em contato pelo email: eng.maykowmenezes@gmail.com descrevendo o problema e não se esqueça de anexar o arquivo da planilha.

Caso queira disponibilizar seu arquivo json para que mais pessoas do seu curso e universidade possa usar, basta nos enviar o arquivo por email em eng.maykowmenezes@gmail.com, ou subir um commit com o arquivo no diretório /cadastro_curso/JSON.


