export function getArrowLength(stroke: number){
    switch(stroke){
     case 1:
        return 10;
     case 2:
        return 14;
     case 3:
        return 18;
     case 4:
        return 22;  
     case 5:
        return 24;
     default: return 10;
    }
}