import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getBlogs, viewBlog} from '../../actions/blogActions';
import Loading from '../shared/loading';
import {withRouter} from 'react-router-dom';


class AllBlogs extends Component {

   
    componentDidMount()
    {
        this.props.getBlogs();
    }


    onClick(id)
    {
        this.props.viewBlog(id, this.props.history)
    }
    render() {

        const {blogs}=this.props.blog;
        const loading="";
        let content;
        
        if(blogs==null || loading){
            content=<Loading />
        }else
        {
            const blogsAll=[...blogs];

            const themes=['primary', 'success','dark', 'light'];

            let randomTheme=Math.floor(Math.random()*themes.length);
            let selectedTheme=themes[randomTheme];
            let printTheme = `card bg bg-${selectedTheme}`;
     
            
            content = blogsAll.map(m=>(
           
                <div className="col-md-6 my-2" key={m._id}>
                <div className={printTheme} style={{height:'250px'}} >
                <div className="card-header">
                 By {m.name} {<h3>{m.heading}</h3>}
                </div>
                <div className="card-body">
                  { 
                      
                      generateViews(m.section , (m.section.length>2 ? 2 : m.section.length))
                      
                    // m.section.map(s=>(
                    //   <div key={s._id} className="text-truncate">
                    // <h5 className="card-title">{s.subHeading}</h5>
                    // <p className="card-text">{s.text}</p>
                    // </div>
                    // ))
                }
                  <div className="d-flex justify-content-start align-center my-1">
                  <button className="btn btn-primary mr-1" onClick={this.onClick.bind(this, m._id)}>Details</button>
                  <i className="far fa-thumbs-up mt-2">{m.likes.length}</i>
                  </div>
                
                </div>
              </div>
              </div>
           
            ))
        }
        return (
            <div className="container">
            <h1>All Blogs</h1>
            <div className="row">
              
                {content}
            </div>
            </div>
            
        )
    }
}


function generateViews(data, length)
{
    console.log(data);
    if(data.length!==0)
    {
        console.log(data[0].text)
    }
  
    for(let i=0; i<length ;i++)
    {return(
        <div key={data[i]._id} className="text-truncate">
            <h5 className="card-title">{data[i].subHeading}</h5>
            <p className="card-text">{data[i].text}</p>
        </div>
    )
    }
}

AllBlogs.propTypes = 
{
    getBlogs:PropTypes.func.isRequired,
    blog:PropTypes.object.isRequired,
    viewBlog:PropTypes.func.isRequired
    
};

const mapStateToProps = state =>({
    blog:state.blog

})




export default connect(mapStateToProps, {getBlogs, viewBlog})(withRouter(AllBlogs));