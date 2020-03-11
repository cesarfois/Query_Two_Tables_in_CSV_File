var mysql = require('mysql')
const ObjectsToCsv = require('objects-to-csv')


var con = mysql.createConnection({
  host: "localhost",
  user: "Usuario",
  password: "Senha",
  database: "nome da base de dados"
});

console.log("=================================================================")
console.log("++++++++      VERIFIQUE SE O ARQUIVO FOI CRIADO           +++++++")
console.log("=================================================================")

con.connect(function(err) {
  if (err) throw err
  // Juntando duas tabelas com um select
  // SELECT DISTINCT <nome coluna1>, <nome coluna2> FROM <nome tabela1> INNER JOIN <nome tabela2> ON <nome_coluna_tabela_2> = <nome_coluna_tabela_2>
  var sql = "SELECT DISTINCT dtt_cnu_sect.DWDOCID,dtt_cnu_sect.PAGECOUNT,dtt_cnu_sect.FILEEXT,dtt_cnu_sect.FILESIZE,dtt_cnu.NOME,dtt_cnu.CPF,dtt_cnu.RG, DATE_FORMAT(dtt_cnu.DWSTOREDATETIME, '%d/%m/%Y %H:%i') AS DATA_DE_ARMAZENAMENTO FROM dwdata.dtt_cnu_sect inner join dwdata.dtt_cnu on dtt_cnu_sect.DWDOCID = dtt_cnu.DWDOCID"
  
   con.query(sql, function (err, result) {
    if (err) throw err
    const csv = new ObjectsToCsv(result)   
    // Cria o CSV // Append False = Sobrescreve o arquivo 
    csv.toDisk('./resultado.csv', { append: false}) 
   
  })
})

console.log("=================================================================")
console.log("++++++++            DEPOIS FECHE A JANELA                 +++++++")
console.log("=================================================================")



