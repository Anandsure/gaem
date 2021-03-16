def modmatrix(a,y,z):
    r=[0]*y
    c=[0]*z
    for i in range(0,y):
        r[i]=0
    for j in range(0,z):
        c[j]=0
    for i in range(0,y):
        for j in range(0,z):
            if(a[i][j]==1):
                r[i]=1
                c[j]=1
    for i in range(0,y):
        for j in range(0,z):
            if(r[i]==1 or c[j]==1):
                a[i][j]=1
    for i in range(0,y):
        for j in range(0,z):
            print(a[i][j],end=" ")


x=int(input())
for _ in range(x):
    y,z=map(int,input().split())
    a=[]
    for _ in range(y):
        m=list(map(int,input().split()))
        a.append(m)
    modmatrix(a,y,z)