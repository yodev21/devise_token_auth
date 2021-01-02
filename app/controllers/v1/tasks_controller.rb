class V1::TasksController < ApplicationController
  
  before_action :set_task, only: [:show]
  before_action :authenticate_v1_user!
  def index
    tasks = Task.all
    render json: tasks
  end

  def create
    user = User.find_by(email: params[:uid])
    task = Task.new(title: params[:title], content: params[:content], user_id: user.id)
    task.save
  end

  def show
    render json: @task
  end

  def update
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render json: true
  end

  private
  def set_task
    @task = Task.find(params[:id])
  end

end
