const express = require('express');
const router = express.Router();
const {student_schema,student_update_schema} = require('../models/student')
const dataPath = './data/students.json';
const fs = require('fs');


router.get('/get', (req, res) =>
   {
       fs.readFile(dataPath, 'utf8', (err, data) =>
       {
           if (err)
           {
               throw err;
           }

           res.send(JSON.parse(data));
       });
   });


router.post('/add', (req, res) => {
       
    //console.log(req.body.modules);
    var sum=0;
    req.body.modules.forEach(element => {
    sum=sum+element.note;
    });
    //console.log(req.body.modules.length);
    console.log(sum);

    var student={nom : req.body.nom, classe : req.body.classe, modules : req.body.modules, moyenne: sum/req.body.modules.length }
    let validation_res = student_schema.validate(req.body);
        if(validation_res.error)
            return res.status(400).send(validation_res.error.message);
        else
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) throw err;
            const objet = JSON.parse(data);
            //console.log(objet)
            console.log(objet.nom);
            objet.push(student) 
            
            
            const newData = JSON.stringify(objet);
            fs.writeFile(dataPath, newData, (err) => {
              if (err) throw err;
              console.log('Le nouvel objet a été ajouté au fichier !');
              res.status(200).send('new student added'); 
            });
      });})

      router.patch('/update/:nom', (req, res) => {
        // Read the JSON file
        const users = JSON.parse(fs.readFileSync(dataPath));
      
        // Find the user by ID
        
        const user = users.find(u => u.nom === req.params.nom);
      
        if (user) {
          // Update the user's age
          user.classe = req.body.classe;
          //Object.values(users);
          console.log(user);
          
          // Write the updated data back to the file
          fs.writeFileSync(dataPath, JSON.stringify(user));
          
          res.send(users);
        } else {
          res.status(404).send('User not found.');
        }
      });
    
      router.delete('/delete/:nom', (req, res) => {
        // Read the JSON file
        const users = JSON.parse(fs.readFileSync(dataPath));
      
        // Find the user by ID
        
        const user = users.find(u => u.nom === req.params.nom);
      
        if (user) {
          // Update the user's age
          users.splice(users.indexOf(user), 1);
            res.status(200).send("person deleted");
          //console.log(user);
          
          // Write the updated data back to the file
          fs.writeFileSync(dataPath, JSON.stringify(users));
          
          res.send(users);
        } else {
          res.status(404).send('User not found.');
        }
      });

      router.get('/moy_general', (req, res) => {
        let sum=0;
        let i=0;
        // Read the JSON file
        const users = JSON.parse(fs.readFileSync(dataPath));
        users.forEach(x => {
            i++;
            sum+=x.moyenne
        });
        let moy=sum/i;
        console.log(moy);
          res.send(`la moyenne generale est: ${moy}`);
       
        
      });

      router.get('/aff_best_worst', (req, res) => {
        var tab=[]
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) throw err;
        const objets = JSON.parse(data);
        const tab = objets.map(x => {
            
            const bestModule = x.modules.reduce((a, b) => a.note > b.note ? a : b);
            const module_name= x.module;
            const worstModule = x.modules.reduce((a, b) => a.note < b.note ? a : b);
            return {
                nom: x.nom,
                best_note: bestModule.note,
                best_module: bestModule.module,
                worst_note: worstModule.note,
                worst_module: worstModule.module
            };
        });
        console.log(tab);
        res.send(tab);
    });
});
    //         if (err) throw err;
    //         const objets = JSON.parse(data);
    //         objets.forEach(x => {
    //             var obj = {}
    //             var best = 0
    //             var worst = 20
    //             x.modules.forEach((y)=>{
    //                 obj.nom= x.nom
    //                 if (y.note>best){
    //                     best=y.note
    //                     obj.best_note=y
    //                 }
    //                 if (y.note<worst){
    //                     worst=y.note
    //                     obj.worst_note=y
    //                 }
    //                 console.log(obj);
    //                 tab.push(obj)
    //                 res.send(tab)
    //             })
                
                
    //         });

    //     })
       
        
    //    })
module.exports=router