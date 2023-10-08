export default function adjustElement({x1,x2,y1,y2,toolType}){
    let changedElemets;

    switch (toolType){
        case "RECTANGLE":
            if(x1>x2 && y1 > y2){
                
                   const minx1 = Math.min(x1,x2);
                   const miny1 = Math.min(y1,y2);
                   const maxx2 = Math.max(x1,x2);
                    const maxy2 = Math.max(y1,y2);

                    changedElemets= {
                        x1: minx1, y1: miny1 , x2: maxx2 ,y2: maxy2
                    }
                    console.log("hey", changedElemets)

                    return changedElemets;
                

            }
    }
}