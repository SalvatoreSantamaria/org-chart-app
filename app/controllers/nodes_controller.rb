class NodesController < ApplicationController
  def index
    all_nodes = Node.all
    respond_to do |format|
      format.html { render html: "There are #{all_nodes.count} nodes" }
      format.json { render json: all_nodes }
    end
  end

  def update
    @updated_node = Node.find(params[:id])
    if @updated_node.update(node_params)
      render json: @updated_node
    else
      render json: @updated_node.errors, status: :unprocessable_entity
    end
  end


  private

  def node_params
    params.require(:node).permit(:parent_id)
  end
end
