import React, { Component } from 'react';
import './chaines.css';

import {table,h2} from 'react-bootstrap';


class Chaines extends Component {
    constructor(){
        super();
        this.state={
            chaines:[],     
                             
        }
              
    }

    //Chercher les Chaines de l'utilisateur 
  async Chercher(){       
    
        var  userid= this.refs.user_id.value;
        fetch('http://localhost:8081/chaine/'+userid)
      .then(res => res.json())
      .then(chaines => this.setState({chaines
    }))
       
  }

    //Supprimer la Chaine selectioner 
       
    async delete(chaine_id)
    {
        var validate =window.confirm('Etes-vous sure de vouloir supprimer cette chaine?');
        if (validate)
        {
        return fetch('http://localhost:8081/chaine/'+chaine_id,{
            method: 'DELETE'  ,                    
        },
        fetch('/chaine/')
        .then(res => res.json())
        .then(chaines => this.setState({chaines}))          
    );   
     

    }

}

    //Ajouter une nouvelle chaine pour l'utilisateur 
    async add()
    {
        var  chaine = this.refs.chaine.value;
        var  user_id = this.refs.user_id.value;

        const headers= new Headers();
        headers.append('Content-Type','application/json');

        const options = {
            method :"POST",
            headers,
            body:JSON.stringify({"chaineContenu":chaine,"user_id":user_id})
        }
        const request = new Request('http://localhost:8081/chaine/addChaine',options);
        const response = await  fetch(request);
        const status = await response.status;

        if( status === 200)
        {
            this.refs.chaine.value=null;
            this.refs.user_id.value=null;
        }
      
        fetch('/chaine/')
            .then(res => res.json())
            .then(chaines => this.setState({chaines}))   
    
    }

    //Init de la page et affichage de toutes les chaines de la base
  componentDidMount(){
     
    
            fetch('/chaine/')
            .then(res => res.json())
            .then(chaines => this.setState({chaines}))        
               
       }
  render() {
    return (
    <div className="container container-fluid">
            <form onSubmit={this.add.bind(this)}>
            <div className="form-group">
                    <div>
                        <label> <h2>Quel utilisateur cherchez-vous ses Chaines ? </h2> </label>
                        <input class="form-control"  ref="user_id" type="number" min="1" name="user_id" id="user_id" placeholder="Identifiant de l'utilisateur" required onChange={this.Chercher.bind(this)}/>  
                    </div>

                    <div className="row">
                        <h2 className="col-6">Ajouter une chaine pour cet utilisateur</h2>
                        <div className="col-6">
                            <input class="form-control"  ref="chaine" type="text" className="col-12" required placeholder="Nouvelle Chaine ici ..." /> 
                            <input class="form-control"  type="submit" value="Ajouter" className="btn btn-primary col-12"/>
                        </div>
                        
                    </div>
            </div>
            </form>  
            {/* Si il y'a un resultat pour l'utilisateur choisi. */}
            <div hidden={this.state.chaines.length===0} >
                <h2>Liste des Chaines</h2>
                <label className="">Cliquez sur une chaine ou un Id pour supprimer</label>
                <table className="table table-striped">
                <thead>
                    <tr>
                   
                    <th scope="col">User id</th>
                    <th scope="col">String</th>
                

                    </tr>
                </thead>
                <tbody>
                
                    {this.state.chaines.map(chaine => 
                    <tr>
                    
                    <th scope="row"  onClick={this.delete.bind (this,chaine._id)}>{chaine.user_id}</th>
                    <td onClick={this.delete.bind (this,chaine._id)} >{chaine.chaineContenu}</td>
            
                    
                    </tr>
                    )}
                    
                </tbody>
                </table>
            </div>
            
           

       
      </div>
    );
  }
}

export default Chaines;
