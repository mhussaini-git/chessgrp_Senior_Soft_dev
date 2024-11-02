from pymongo import MongoClient
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    @classmethod
    async def connect_db(cls):
        cls.client = AsyncIOMotorClient(MONGODB_URL)
        
    @classmethod
    async def close_db(cls):
        if cls.client is not None:
            await cls.client.close()
            
    @classmethod
    def get_db(cls):
        if cls.client is None:
            raise Exception("Database not initialized")
        return cls.client.video_processing 