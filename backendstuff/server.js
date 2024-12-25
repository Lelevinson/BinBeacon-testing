import express from "express";
import cors from 'cors';
import { gettingCoords } from './markergetter.js';
import supabase from './supabaseClient.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//const port = 3000;
const stadia = process.env.STADIA_API

app.use(cors());
app.use(express.json())

app.get('/ambil-marker', async (req, res) => {
  const coords = await gettingCoords();
  res.json(coords);
});

app.get('/configsta', (req, res) => {
  res.json({stadia});
});

app.post('/tambah-marker-user', async(req,res) => {
  const { corx, cory, type, name } = req.body
  console.log(type, cory);

  try{
  await addingMarkersTDB(corx, cory, type, name);
	res.json("tambah marker user recevied");
  } catch(error){
  res.json("fuck gbs add")};
});

app.listen(port, () => {
  console.log('running server on port:', port);
}).on('error', (err) => {
  console.error('Server error:', err)
});


const addingMarkersTDB = async (x, y, tipe, nama) => { //sendcurrentloc
 
  let userCorX = x;
  let userCorY = y;
  let userBinType = tipe;
  let userName = nama;
  console.log(userCorX, userCorY, userBinType, userName)
  
  try {
		let { data: markers1, error } = await supabase
		.from('markers1')
		.insert(
			{
				coordinate_x: userCorX,
				coordinate_y: userCorY,
				type: userBinType,
				creator: nama|| null,
			}
		);

    console.log("hrsnya oke")
		if (markers1) {
			console.log(markers1)
		}

    if(error)
      {
        console.log("supaerror", error);
        throw new Error(error.message);
      }
      
	} catch(error){
    console.log(error); 
    }
} 