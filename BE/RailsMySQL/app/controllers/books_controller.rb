class BooksController < ApplicationController
  def index
    @book = Book.all
    render json: @book
  end
  
  def new
    @book = Book.new
  end

  def create
    @book = Book.create(books_params)
    if @book.save
      render json: { status: 200, book: @book }
    else
      render json: { status: 500 }
    end
  end

  def show
    @book = Book.find(params[:id])
    if @book
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end

  def edit
    @book = Book.find(params[:id])
    if @book
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end

  def update
    @book = Book.find(params[:id])
    @book.update(books_params)
    if @book
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end
  
  private

    def books_params
      params.require(:book).permit(:title, :label, :body, :user_id)
    end

  end
