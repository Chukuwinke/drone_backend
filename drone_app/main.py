from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from experiments import connect, connectServer

app = FastAPI()

class Item(BaseModel):
    target: str
    missionKey: str


def runDrone(missionKey):
    drone = connect.Connect('udpin:localhost:14551')
    connection = connectServer.SocketDroneToserver('http://localhost:3000', {'token': 'my-token'}, drone)
    connection.connectToServer(missionKey)

@app.post("/api/bind")
def read_root(item:Item):
    
    print("woooooo!!!",item.missionKey)
    runDrone(item.missionKey)
    return {"?q=example"}

# @app.post("/api/bind")
# async def read_post(item: Item):
#     runDrone(item.missionKey)
#     print("woooooo!!!",item.missionKey)
#     return {"greeting": "Hello python drone"}
