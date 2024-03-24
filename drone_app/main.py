
# main.py

from app import create_app

app = create_app()
print("heres Matty")
# if __name__ == '__main__':
    
#     app.run(host='0.0.0.0', port=8080)




















# from typing import List
# from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import Optional
# from experiments import connect, connectServer

# app = FastAPI()

# class Item(BaseModel):
#     target: str
#     missionKey: str


# def runDrone(missionKey):
#     drone = connect.Connect('udpin:localhost:14551')
#     connection = connectServer.SocketDroneToserver('http://localhost:3000', {'token': 'my-token'}, drone)
#     connection.connectToServer(missionKey)

# @app.post("/api/bind")
# def read_root(item:Item):
    
#     print("woooooo!!!",item.missionKey)
#     # FIGURE OUT HOW TO RUN DRONE SUCESSFUL LAUNCH CHECK BEFORE RETURNING REPLY (try catch)
#     runDrone(item.missionKey)
#     return {"?q=example"}

# @app.post("/api/bind")
# async def read_post(item: Item):
#     runDrone(item.missionKey)
#     print("woooooo!!!",item.missionKey)
#     return {"greeting": "Hello python drone"}
