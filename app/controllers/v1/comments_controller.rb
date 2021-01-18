class V1::CommentsController < ApplicationController
  before_action :set_comment, only: [:show]
  before_action :authenticate_v1_user!
  
  def index

    comments = Comment.where(task_id: params[:task_id])

    render json: comments
  end
end
