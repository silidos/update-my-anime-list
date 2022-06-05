import React, { useEffect, useRef, useState } from 'react';
import '../styles/Form.css';
import axios from 'axios';
import MyAnimeListAPI from '../types/types';

const Form = (props: any) => {
    const [anime, setAnime] = useState('');
    const [listOfAnime, setListOfAnime] = useState<Array<MyAnimeListAPI.Item>>([]);
    // using ref to ignore late api calls, otherwise will update the list even when there's nothing in the text box
    // updating state = component rerenders (awaiting on a late api call, the state on that component/api call is out of date)
    // updating ref = stored elsewhere so late api calls will be cancelled
    let cancel = useRef({
        cancel: false
    });
	let handleTyping = async (anime: string) => {
    if(anime !== ' ' && anime.length > 0) {
        setAnime(anime);
      // TODO: reroute this request through express or something
      const corsProxy = "https://thingproxy.freeboard.io/fetch/"
    const resp = await axios.get(`${corsProxy}https://myanimelist.net/search/prefix.json?type=all&keyword=${anime}&v=1`);
    const responseData: MyAnimeListAPI.SearchResponse = resp.data
    console.log(responseData.categories);
    if(responseData.categories[0]) {
        setListOfAnime(responseData.categories[0].items);
    }
    } else {
        setAnime('');
        setListOfAnime([]);
    }
  };

  useEffect(() => {
      if(anime.length === 0) {
        cancel.current.cancel = true;
      } else {
        cancel.current.cancel = false;
      }
  });
  
  let renderAnime = () => {
    if (!cancel.current.cancel) {
        return (
            <ul>
              {listOfAnime.map(item => <li key={item.id} onClick={(e)=>console.log(item)}>{item.name}</li>)}
            </ul>
          )
    } else {
        return (
            <ul>
            </ul>
        )
    }
  }

  	return (
    	<div className="TypeAheadDropDown">
    	  <input 
          type="text" 
          value={anime}
          onChange={event => handleTyping(event.target.value)}
          placeholder="Anime Lookup" 
          required/>

         {renderAnime()}
    	</div>
    );
}

export default Form