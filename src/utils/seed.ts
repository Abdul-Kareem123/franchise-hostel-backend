import { Schema } from 'mongoose';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import Building from '../models/building.model';
import Floor, {IFloor} from '../models/floor.model';
import Room from '../models/room.model';
import Owner from '../models/owner.model';

// dotenv.config();

const seedData = async () => {
//   await mongoose.connect(process.env.MONGO_URI!);
  await mongoose.connect('mongodb://127.0.0.1:27017/pixaliveworks');
  console.log('Connected to DB');

  await Building.deleteMany({});
  await Floor.deleteMany({});
  await Room.deleteMany({});
  await Owner.deleteMany({});


  const owner = await Owner.create({
    name: 'PG Owner',
    email: 'owner@example.com',
    password: 'password123',
    phone: '9876543210'
  });

  const building = await Building.create({
    name: 'Sunshine PG',
    address: '123 Main Street',
    owner: owner._id
  });

  const floors: IFloor[] = [];
  for (let i = 1; i <= 3; i++) {
    const floor = await Floor.create({
      number: i,
      building: building._id
    });
    floors.push(floor);
  }

  building.floors = floors.map(f => f._id as Schema.Types.ObjectId);
  await building.save();

  const sharingRent: Record<number, number> = { 1: 10000, 2: 7500, 3: 6000, 4: 5000 };

  for (const floor of floors) {
    for (let r = 1; r <= 5; r++) {
      const sharingType = (r % 4) + 1;
      await Room.create({
        number: `F${floor.number}-R${r}`,
        sharingType,
        rent: sharingRent[sharingType],
        isAvailable: true,
        floor: floor._id
      });
    }
  }

  console.log('Seed data inserted');
  process.exit();
};

seedData();
