class RecintosZoo{
    constructor(){
        let zoo_recintos =[
                           {recinto: 1, bioma:"Savana", tamanhoTotal: 10, animaisExistentes:[{especie:"MACACO", quantidade:3}]},
                           {recinto: 2, bioma:"floresta", tamanhoTotal: 5, animaisExistentes:[]},
                           {recinto: 3, bioma:"Savana e rio",tamanhoTotal: 7, animaisExistentes:[{especie:"GAZELA", quantidade:1}]},
                           {recinto: 4, bioma:"rio", tamanhoTotal:8, animaisExistentes:[]},
                           {recinto: 5, bioma:"savana",tamanhoTotal: 9, animaisExistentes:[{especie:"LEÃO",quantidade:1}]}
        
        ];
        let info_animais = {
            LEAO :      {tamanho:3,  bioma: "Savana",carnivoro: true},
            LEOPARDO :  {tamanho:2,  bioma: "Savana",carnivoro:true},
            CROCODILO : {tamanho:3,  bioma: "Rio", carnivoro:true},
            MACACO:     {tamanho:1,  bioma: "Floresta", carnivoro:false},
            GAZELA :    {tamanho:2,  bioma: "Savana",carnivoro: false},
            HIPOPOTAMO :{tamanho:4,  bioma: "Savana ou rio",carnivoro:false}

        };
        
       // {  
     function analisaRecintos (especie, quantidade){ 
        let animal= info_animais[especie];
        if(!animal){
            return"Animal invalido"; 
        } 

        if (quantidade <= 0||!Number.isInteger(quantidade)){
            {return "Quantidade inválida"}
        }
              
        let EncontraRecinto = [];
        for (let i= 0; i < zoo_recintos.length; i++){
            
            let recinto = zoo_recintos[i];

            let biomaValidos = animal.bioma.split(" ou ");
            let biomaValido = false;
            for (let j = 0;j < biomaValidos.length; j++){

                if(recinto.bioma.indexOf(biomaValidos[j])!==-1){
                    biomaValido = true;
                    break;
                }

            }

            if(!biomaValido) {
                continue;

            }

           let espacoOcupado = 0;
           for (let k = 0; k <recinto.animaisExistentes.length; k++){
            let animalAtual = recinto.animaisExistentes[k];
            espacoOcupado += animalAtual.quantidade*info_animais[animalAtual.especie].tamanho;
            
           }
        
           let espacoRestante = recinto.tamanhoTotal - espacoOcupado - (recinto.animaisExistentes.length> 0 ? 1 : 0 );

           let regraCarnivoros = true;
           let regraHipopotamos= true;
           let regraMacacos = true;
           
           for (let k = 0;  k < recinto.animaisExistentes.length; k++) {
               let especieAtual = recinto.animaisExistentes[k].especie;
               let infoAtual = info_animais[especieAtual];
       
               if(animal.carnivoro && infoAtual.carnivoro && especieAtual !== especie){
                   regraCarnivoros =  false;
                   break;
               }
       
               if(especieAtual=== "HIPOPOTAMO" && recinto.bioma !=="savana e rio") {
                       regraHipopotamos = false;
                   break;
               }
           }  
        
        
           if (!regraCarnivoros || !regraHipopotamos ||!regraMacacos) continue;
    

           EncontraRecinto.push({
               numero: recinto.recinto,
               espacoLivre: espacoRestante,
               tamanhoTotal: recinto.tamanhoTotal
               
           });
        
        
        
        }
        
    
    


    
       if (EncontraRecinto.length === 0) {
        return "Não ha recinto vivavel";
       }

       EncontraRecinto.sort((a,b)=>a.numero- b.numero);

       return EncontraRecinto.map(
         recinto => `Recinto nro${recinto.recinto}(espaco livre: ${recinto.espacoLivre} total: ${recinto.tamanhoTotal})`
       );
     
   
}
 // Expõe a função para uso externo
 this.encontrarRecintos = analisaRecintos;

}
}
  const zoo = new RecintosZoo();
  console.log(zoo.encontrarRecintos("LEAO",1));
  console.log(zoo.encontrarRecintos("GAZELA",1));
  console.log(zoo.encontrarRecintos("CROCODILO",2))

//}

export { RecintosZoo as RecintosZoo };
