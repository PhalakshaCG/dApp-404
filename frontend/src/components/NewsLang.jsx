import { useRef, useState } from "react";
const NewsLang = () => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [heading, setHeading] = useState("");
    const [list, setList] = useState(['Subject','Object','Sentence','Connector']);
   const colors = ['lightblue','orange','cyan','lightgreen']
    const dragStart = (e, position) => {
      dragItem.current = position;
      console.log(e.target.innerHTML);
    };
   
    const dragEnter = (e, position) => {
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
    };
   
    const drop = (e) => {
      const copyListItems = [...list];
      const dragItemContent = copyListItems[dragItem.current];
      document.getElementById("Heading").value = heading+" "+dragItemContent;
      setHeading(heading+" "+dragItemContent);
      
    };
   
    return (
      <><input type="text" id="Heading" placeholder="News Language" style={{fontSize:'30px',backgroundColor:"inherit", borderColor:"white", borderWidth:"2px"}         
        } onInput={()=>{
            setHeading(this.value)
        }
      }/>
      {
      list&&
      list.map((item, index) => (
        <input style={{cursor:"grab", backgroundColor:colors[index], margin:'5px 25%',  textAlign:'center', fontSize:'25px'}}
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          key={index}
          draggable
          placeholder={item}
          onInputCapture={(e)=>{
            console.log(" ")
            let copyItems = list
            copyItems[index] = e.target.value
            setList(copyItems)
          }}
          >
        </input>
        ))}
        <button onClick={()=>{
            document.getElementById("Heading").value=""
            setHeading("")
            }}>
            Clear
        </button>
      </>
    );
  };

  export default NewsLang;