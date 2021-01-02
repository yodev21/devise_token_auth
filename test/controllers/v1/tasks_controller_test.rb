require 'test_helper'

class V1::TasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get v1_tasks_index_url
    assert_response :success
  end

  test "should get show" do
    get v1_tasks_show_url
    assert_response :success
  end

  test "should get update" do
    get v1_tasks_update_url
    assert_response :success
  end

  test "should get destroy" do
    get v1_tasks_destroy_url
    assert_response :success
  end

end
