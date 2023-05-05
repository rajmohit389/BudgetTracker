const Event = require("./event")
const User = require("./user")

const foodItems = ["sudha","nescafe","maggi","canteen","food", "swiggy", "zomato", "chicken", "biriyani", "dal", "roti", "paratha", "rice", "bread", "jam", "beverages", "mutton", "fish", "paneer", "mushroom", "cauliflower", "sabzi", "desert", "idli", "vada", "dosa", "aloo", "chhole", "bhature", "pavbhaji", "littichokha"]
const leisure = ["gift","hangout","leisure", "movie", "trip", "shopping", "arcade", "party", "tour", "celebration"]
const gym = ["exercise", "gym","cycl"]
const medicines = ["Paracetamol", "Azithromycin", "Rifaximin", "voloni", "moov", "medicine", "tablet", "syrup", "pills"]
const groceryItems = ["store","items","shop","grocery", "fruit", "vegetable", "rice", "snacks", "toiletries", "miscellaneous", "soap", "shampoo", "wash", "biscuit"]
const eventItems = ["birth", "holi", "diwali","christmas","deewali","shivratri"]

module.exports.postFunction = async (doc) => {
    if (doc) {
        const presentUser = await User.findById(doc.author)
        if (doc.type) {
            presentUser.totalBalance += doc.value
        }
        else {
            presentUser.totalBalance -= doc.value;
        }
        var check = 0
        let currMonth=doc.date.getMonth()
        let currYear=doc.date.getFullYear()
        
        if (doc.type == 0) {
            const desc = doc.description.toLowerCase()
            for(let i=0;i<foodItems.length;i++){
                if(desc.includes(foodItems[i])){
                    if(presentUser.foodExpenditure[currMonth].mark!=currYear){
                        presentUser.foodExpenditure[currMonth].value=0
                    }
                    presentUser.foodExpenditure[currMonth].value+=doc.value
                    presentUser.foodExpenditure[currMonth].mark=currYear
                    check = 1
                    break
                }
            }
            for(let i=0;i<groceryItems.length;i++){
                if(desc.includes(groceryItems[i])){
                    if(presentUser.groceryExpenditure[currMonth].mark!=currYear){
                        presentUser.groceryExpenditure[currMonth].value=0
                    }
                    presentUser.groceryExpenditure[currMonth].value+=doc.value
                    presentUser.groceryExpenditure[currMonth].mark=currYear
                    check = 1
                    break
                }
            }
            for(let i=0;i<medicines.length;i++){
                if(desc.includes(medicines[i])){
                    if(presentUser.medicineExpenditure[currMonth].mark!=currYear){
                        presentUser.medicineExpenditure[currMonth].value=0
                    }
                    presentUser.medicineExpenditure[currMonth].value+=doc.value
                    presentUser.medicineExpenditure[currMonth].mark=currYear
                    check = 1
                    break
                }
            }
            for(let i=0;i<gym.length;i++){
                if(desc.includes(gym[i])){
                    if(presentUser.gymExpenditure[currMonth].mark!=currYear){
                        presentUser.gymExpenditure[currMonth].value=0
                    }
                    presentUser.gymExpenditure[currMonth].value+=doc.value
                    presentUser.gymExpenditure[currMonth].mark=currYear
                    check = 1
                    break
                }
            }
            for(let i=0;i<leisure.length;i++){
                if(desc.includes(leisure[i])){
                    if(presentUser.leisureExpenditure[currMonth].mark!=currYear){
                        presentUser.leisureExpenditure[currMonth].value=0
                    }
                    presentUser.leisureExpenditure[currMonth].value+=doc.value
                    presentUser.leisureExpenditure[currMonth].mark=currYear
                    check = 1
                    break
                }
            }
            for(let i=0;i<eventItems.length;i++){
                if(desc.includes(eventItems[i])){
                    const { description, value, date } = doc
                    const newEvent = new Event({ description, value, date })
                    newEvent.author = doc.author
                    await newEvent.save()
                    check=1
                    break
                }
            }
            if (!check) {
                if(presentUser.miscExpenditure[currMonth].mark!=currYear){
                    presentUser.miscExpenditure[currMonth].value=0
                }
                presentUser.miscExpenditure[currMonth].value+=doc.value
                presentUser.miscExpenditure[currMonth].mark=currYear
            }
            await presentUser.save()
        }
    }
}
