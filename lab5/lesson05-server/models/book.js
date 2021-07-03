const books=[]

module.exports=class Book{

constructor(id,title,ISBN,publishedDate,author){
this.id=id;
this.title=title;
this.ISBN=ISBN;
this.publishedDate=publishedDate;
this.author=author
}

createBook(){
    this.id=Math.random().toString()
    books.push(this)
  return books

}
 updateBook(id){
     const index=books.findByIndex(item=>item.id===this.id)
     if(index>-1){
         books.splice(index,1,this)
     }else{
         throw new Error('not found')
     }
 }

static fetchAll(){
    return books;
}

static findBookById(bookId){
    const index=books.findByIndex(p=>p.id===bookId)
    if(index>-1){
        return books[index]
    }else{
        throw new Error('Not Found')
    }
}
static deleteBook(bookId){
    const index=books.findIndex(p=>p.id===bookId)
    if(index>-1){
        books=books.filter(p=>p.id!==bookId)
    }else{
        throw new Error("Not Found")
    }
}



}