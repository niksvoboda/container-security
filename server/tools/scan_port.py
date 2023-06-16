import os
import subprocess
import pandas as pd
import argparse
import sys
import traceback
import psycopg2 
from datetime import datetime


connection = psycopg2.connect(user = "postgres",
                                  password = "root",
                                  host = "localhost",
                                  port = "5433",
                                  database = "postgres")
cursor = connection.cursor()
connection.autocommit = True

mydir = '/'

def validate_ip_address(ipAddress):
    with open('log.txt', 'w+', encoding='utf-8') as log:
        try:
            parts = ipAddress.split(".")
            if len(parts) != 4: print(traceback.print_exc(file=log)), sys.exit()
            for part in parts:
                if not part.isdigit(): print(traceback.print_exc(file=log)), sys.exit()
                if int(part) < 0 or int(part) > 255: print(traceback.print_exc(file=log)), sys.exit()
        except Exception: 
            traceback.print_exc(file=log)
            sys.exit()

def PortScan(ip):
    with open('portscan.txt', 'w+', encoding='utf-8') as f, \
    open('log.txt', 'w+', encoding='utf-8') as log:
        try:
            global start, end
            start = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
            cmd = 'nmap', '--open', ip
            subprocess.Popen(cmd, stdout=f, text=True, shell=False)
            end = datetime.now().strftime("%Y-%m-%d_%H:%M:%S") 
        except Exception: 
            traceback.print_exc(file=log)

def Interfaces():
    with open('portscan.txt', 'w+', encoding='utf-8') as f, \
        open('log.txt', 'w+', encoding='utf-8') as log:
        try:
            global start, end
            res = os.popen('nmcli device show')
            split = res.read().split()
            interfaces = []
            for i in range(len(split)):
                if split[i] == 'IP4.ADDRESS[1]:':         
                    interface = split[i+1]
                    interfaces.append(interface)
            if '127.0.0.1/8' in interfaces:
                interfaces.remove('127.0.0.1/8')
            for ip in interfaces:
                start = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
                cmd = 'nmap', '--open', ip
                subprocess.Popen(cmd, stdout=f, text=True, shell=False)
                end = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")  
        except Exception: 
            traceback.print_exc(file=log)

def Sort(*nums):
    with open('portscan.txt', 'r', encoding='utf-8') as file1, \
        open('log.txt', 'w+', encoding='utf-8') as log:
        try:
            if nums:
                df1 = pd.DataFrame(columns = ['IP', 'MASK', 'PORT/PROTOCOL', 'PORT', 'PROTOCOL', 'SERVICE', 'DATA_S', 'DATA_E'])
            else: 
                df1 = pd.DataFrame(columns = ['IP', 'PORT/PROTOCOL', 'PORT', 'PROTOCOL', 'SERVICE', 'DATA_S', 'DATA_E'])
            for line in file1:
                res_d = line.split()
                if 'Nmap' and 'scan' in res_d:
                    ip = res_d[-1]
                    if '(' and ')' in ip:
                        ip = ip[1:-1]
                if len(res_d) == 3:
                    if 'PORT' in res_d:
                        continue   
                    res_d.remove('open')
                    res_d.append(res_d[0].split('/')[0])
                    res_d.append(res_d[0].split('/')[1])
                    res_d.append(ip)  
                    res_d.append(start)
                    res_d.append(end)
                    if nums:
                        res_d.append(nums[0])
                        res_d[0], res_d[1], res_d[2], res_d[3], res_d[4], res_d[5], res_d[6], res_d[7]  = res_d[4], res_d[7], res_d[0], res_d[2], res_d[3], res_d[1], res_d[5], res_d[6] 
                        df1.loc[len(df1)] = res_d 
                        df1 = df1.drop_duplicates(keep='first')
                    else: 
                        res_d[0], res_d[1], res_d[4] = res_d[4], res_d[0], res_d[1]
                        df1.loc[len(df1)] = res_d 
                        df1 = df1.drop_duplicates(keep='first')
            f_path = []
            mas = []
            [f_path.append(name + '.txt') for name in df1['SERVICE']]
            for name2 in f_path:
               with open(name2, 'w+', encoding='utf-8') as file2:
                    file2.write(str(df1.loc[df1['SERVICE'] == name2.split('.')[0]])) 
               with open(name2, 'r', encoding='utf-8') as file2:  
                    file_content = file2.readlines()[1:]
                    for i in file_content:
                        mas.append(i[3:])
            values = [line.split() for line in mas]
            if nums:
                postgres_insert_query = "INSERT INTO scan (ip, mask, port_protocol, port, protocol, service, launch_date, ending_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
            else:
                postgres_insert_query = "INSERT INTO scan (ip, port_protocol, port, protocol, service, launch_date, ending_date) VALUES (%s, %s, %s, %s, %s, %s, %s);"
            cursor.executemany(postgres_insert_query, values)
        except Exception:
            connection.rollback()
            traceback.print_exc(file=log)  

def PortScan_Nim(ip, *nums):
   with open('portscan.txt', 'w+', encoding='utf-8') as f, \
   open('log.txt', 'w+', encoding='utf-8') as log, open('portscan1.txt', 'w+', encoding='utf-8') as gg_vp:
      try:
         start = datetime.now().strftime("%Y-%m-%d% %H:%M:%S")
         cmd = './NimScan', ip, '-a'
         merp = subprocess.call(cmd, stdout=f, text=True, shell=False)
         end = datetime.now().strftime("%Y-%m-%d% %H:%M:%S")
         os.system('sed -r "" portscan.txt > portscan1.txt')
         mass = []
         values = []
         uniq = []
         for line in gg_vp:
            if 'Open' in line:
               num_dv = line.find(' ')
               num_gl = line.rfind('\x1b[')
               line = line[num_dv + 1:num_gl]  
               line = line.split(':')
               if nums: mass.append(line[0][4:]), mass.append(nums[0]), mass.append(line[1]), mass.append(start), mass.append(end)
               else: mass.append(line[0][4:]), mass.append(line[1]), mass.append(start), mass.append(end)
         if nums:
            while len(mass) > 5:
                pice = mass[:5]
                values.append(pice)
                mass = mass[5:]
            values.append(mass)
            postgres_insert_query = "INSERT INTO scan (ip, mask, port, launch_date, ending_date) VALUES (%s, %s, %s, %s, %s);"
         else:
            while len(mass) > 4:
                pice = mass[:4]
                values.append(pice)
                mass = mass[4:]
            values.append(mass)
            postgres_insert_query = "INSERT INTO scan (ip, port, launch_date, ending_date) VALUES (%s, %s, %s, %s);"
         [uniq.append(i) for i in values if not i in uniq]
         cursor.executemany(postgres_insert_query, uniq)
      except Exception: 
         connection.rollback()
         traceback.print_exc(file=log)

def Interfaces_Nim():
   with open('portscan.txt','w+', encoding='utf-8') as f, \
   open('log.txt', 'w+', encoding='utf-8') as log,  open('portscan1.txt', 'w+') as gg_vp:
        try:
            res = os.popen('nmcli device show')
            split = res.read().split()
            interfaces = []
            uniq = []
            for i in range(len(split)):
                if split[i] == 'IP4.ADDRESS[1]:':         
                    interface = split[i+1]
                    interfaces.append(interface)
            if '127.0.0.1/8' in interfaces:
                interfaces.remove('127.0.0.1/8')
            for j in interfaces:
               start = datetime.now().strftime("%Y-%m-%d% %H:%M:%S")
               cmd = './NimScan', j, '-a'
               merp = subprocess.call(cmd, stdout=f, text=True, shell=False)
               end = datetime.now().strftime("%Y-%m-%d% %H:%M:%S")  
               os.system('sed -r "" portscan.txt > portscan1.txt')
               mass = []
               values = []
               for line in gg_vp:
                  if 'Open' in line:
                     num_dv = line.find(' ')
                     num_gl = line.rfind('\x1b[')
                     line = line[num_dv + 1:num_gl]
                     line = line.split(':')
                     mass.append(line[0][4:])
                     mass.append(line[1])
                     mass.append(start)
                     mass.append(end)
               while len(mass) > 4:
                  pice = mass[:4]
                  values.append(pice)
                  mass = mass[4:]
               values.append(mass)
               [uniq.append(i) for i in values if not i in uniq]
               postgres_insert_query = "INSERT INTO scan (ip, port, launch_date, ending_date) VALUES (%s, %s, %s, %s);"
               cursor.executemany(postgres_insert_query, uniq)
        except Exception: 
            connection.rollback()
            traceback.print_exc(file=log)

def main():  
    parser = argparse.ArgumentParser(add_help=False)

    main_group = parser.add_mutually_exclusive_group(required=False)
    main_group.add_argument('-p', dest='p', action='store_true') 
    main_group.add_argument('-j',  dest='j', action='store_true') 

    main_group_two = parser.add_mutually_exclusive_group(required=False)
    main_group_two.add_argument('-k', dest='ip', type=str, action='store')
    main_group_two.add_argument('-w', dest='ip_rg', type=str, action='store')
    main_group_two.add_argument('-ww', dest='mask', type=str, action='store')

    parser.add_argument("-l",  dest='log', action='store_true') 
    parser.add_argument("-i",  dest='i', action='store_true') 


    mylist1 = ['-p', '-j', '-k', '-w', '-ww', '-l', '-i']
    
    args, unknown = parser.parse_known_args()

    for x in sys.argv[1:]:
        if '-' in x.split(' ')[0] and x[0] == '-': 
            if x in mylist1: continue
            else: print(traceback.print_exc(file=log)), sys.exit()      

    if len(sys.argv) <= 1: print(traceback.print_exc(file=log)), sys.exit()

    if (args.p):
            if (args.ip):
                validate_ip_address(args.ip) 
                PortScan(args.ip) 
                os.wait()
                Sort()

            if (args.ip_rg): 
                 res = args.ip_rg.split('-')
                 validate_ip_address(res[0])
                 if int(res[1]) < 1 or int(res[1]) > 255: sys.exit()
                 else: PortScan(args.ip_rg), os.wait(), Sort()

            if (args.mask): 
                 res_mask = args.mask.split('/')
                 validate_ip_address(res_mask[0])
                 if int(res_mask[1]) < 1 or int(res_mask[1]) > 32: sys.exit()
                 else: PortScan(args.mask), os.wait(), Sort(res_mask[1])

            if (args.i): Interfaces(), os.wait(), Sort()

            if (args.log):
                try:
                    with open('log.txt', 'r') as log:
                        myFile = log.read()
                        print(myFile) 
                except FileNotFoundError:
                    print('Error')

    #else: print(traceback.print_exc(file=log)), sys.exit()       

    if (args.j):
            if (args.ip): 
                validate_ip_address(args.ip)
                PortScan_Nim(args.ip)  

            if (args.ip_rg): 
                res = args.ip_rg.split('-')
                validate_ip_address(res[0])
                validate_ip_address(res[1])
                PortScan_Nim(args.ip_rg) 

            if (args.mask):
                res_mask = args.mask.split('/')
                validate_ip_address(res_mask[0])
                if int(res_mask[1]) < 1 or int(res_mask[1]) > 32: sys.exit()
                else: PortScan_Nim(args.mask, res_mask[1])
                
            if (args.i): Interfaces_Nim()
 
            if (args.log):
                try:
                    with open('log.txt', 'r') as log:
                        myFile = log.read()
                        print(myFile) 
                except FileNotFoundError:
                    print('Error')

    #else: print(traceback.print_exc(file=log)), sys.exit()

    if (args.log):
                try:
                    with open('log.txt', 'r') as log:
                        myFile = log.read()
                        print(myFile) 
                except FileNotFoundError:
                    print('Error')
    
if __name__ == '__main__':
    try:
#        [os.remove(os.path.join(mydir, f)) for f in os.listdir(mydir) if f.endswith(".txt")]  
        main()
        print('0')
    except Exception as e: 
        print(e) 
        print('-1')
        sys.exit()
    finally:
        if connection:
            cursor.close()
            connection.close() 