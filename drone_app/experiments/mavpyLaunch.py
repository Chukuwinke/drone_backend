from fastapi import FastAPI
import subprocess
import time

#app = FastAPI()


async def run_mavproxy():
    # I SET THE IP ADDRESS TO THAT OF THE ARDUPILOT CONTAINER
    mavproxy_command = ["mavproxy.py", "--master=tcp:172.17.0.2:5760", "--out=udp:172.17.0.3:14550","--out=udp:172.17.0.3:14551"]
    
    try:
        mavproxy_process = subprocess.Popen(mavproxy_command,
                                            stdin=subprocess.PIPE,
                                            stdout=subprocess.PIPE,
                                            stderr=subprocess.PIPE,
                                            text=True,
                                            bufsize=1)
        
        #time.sleep(2) 

        if mavproxy_process.poll() is None:
            connected = False
            for line in mavproxy_process.stdout:
                print(line)
                if "STABILIZE> Mode STABILIZE" in line:
                    print(line)
                    connected = True
                    break
            if connected:
                return {"message": "MAVProxy started and connected successfully"}
            else:
                return {"message": "MAVProxy started but not connected yet"}
        else:
            return {"error": "Error starting MAVProxy"}
        # Optionally, you can capture and process the output
        # output = []
        # for line in mavproxy_process.stdout:
        #     output.append(line.strip())
        
        # # Wait for the process to finish (or use other logic)
        # mavproxy_process.wait()
        
        # return {"output": output}
        
    except subprocess.CalledProcessError as e:
        return {"error": f"Error: {e}"}
    except KeyboardInterrupt:
        mavproxy_process.terminate()
        return {"error": "Process terminated by user"}
